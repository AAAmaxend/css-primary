// 重点：页面刷新不会丢失数据【不管回车、点击复选框】

// todolist本地存储数据渲染加载到页面
// 1、声明一个函数load，方便渲染加载调用操作
// 2、读取本都存储数据【数据读取为对象类型，数据存储为字符串】
// 3、遍历$.each()有几个数据 生成几个小li添加到ol里面

$(function () {
    load();

    // 1.按回车 13 ，把完整数据 存到本地存储里面
    $("#title").on("keydown", function (event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要进行的操作");
            } else {
                // 先读取本地存储数据。按下回车时
                var local = getData();
                console.log(local);

                // 更新数据local数组 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });

                // 把最新的数组 存储给本地存储
                saveData(local);


                // 2.数据渲染到页面
                load();

                $(this).val(""); //回车输入空
            }
        }
    });

    // 读取本地存储的数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储 数据类型为字符串，我们需要的是对象类型
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 把最新的数组 存储给本地存储
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data))
    }


    // 2.渲染加载数据
    function load() {
        var data = getData();  //获取本地存储的数据
        console.log(data);

        // 遍历之前 先清空ol里面的元素内容
        // $("ol").empty();
        $("ol,ul").empty();

        // 正在进行的个数
        var todoCount = 0;
        var doneCount = 0;

        $.each(data, function (i, n) {
            console.log(n);

            if (n.done) {
                $("ul").prepend("<li><input type='checkbox'> <p>" + n.title + "</p> <a href='javascript:;' id=" + i + "></a > </li > ") //追加到ol的小li里面
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'> <p>" + n.title + "</p> <a href='javascript:;' id=" + i + "></a > </li > ") //追加到ol的小li里面
                todoCount++;
            }
        })
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount)
    }

    // 3、删除操作
    // 不是删除li，而是删除本地存储对应的数据
    // 1）先获取本地存储数据，2）删除对应的数据，3）保存给本地存储，4）重新渲染列表li
    $("ol,ul").on("click", "a", function () {
        var data = getData();
        console.log(data);

        var index = $(this).attr("id"); //获取索引号
        console.log(index);
        data.splice(index, 1);

        saveData(data);

        load();
    })

    // 4、正在进行和已完成选项操作 获取，修改缓存为true，保存，重新渲染
    $("ol,ul").on("click", "input", function () {
        var data = getData();

        var index = $(this).siblings("a").attr("id");
        // console.log(index);
        data[index].done = $(this).prop("checked");
        console.log(data);

        saveData(data);

        load();

    })



})