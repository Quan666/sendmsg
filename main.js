sleep(2000)
toast('开始');

var i = 0;
var Count = 1;
Count = rawInput("发送条数", 1);
var sleepTime=5000
sleepTime = rawInput("休息时间", 5000);
var flag = true;
var fuck=false;
var clear = confirm("要开启骂人模式吗?");
if(clear){
    fuck=true;
}

var fuckAPI='https://zuanbot.com/api.php?level=min&lang=zh_cn';
var dayOne='https://v1.hitokoto.cn';
while (flag) {

    http.get(fuck?fuckAPI:dayOne, {}, function (res, err) {
        if (err) {
            console.error(err);
            return;
        }

        var json = fuck?res.body.string():res.body.json().hitokoto;
        if (i >= Count) {
            flag = false;
            return;
        }
        i++;
        setText(json);
        text("发送").click();

    });
    sleep(1000);
}
