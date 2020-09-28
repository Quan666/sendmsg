sleep(2000)
toast('开始');
var APIKEY = "Z3qi2q";
var apiLink = [
    "https://v1.hitokoto.cn",
    "https://nmsl.shadiao.app/api.php?from=" + APIKEY,
    "https://nmsl.shadiao.app/api.php?level=min&from=" + APIKEY,
    "https://chp.shadiao.app/api.php?from=" + APIKEY,
    "https://pyq.shadiao.app/api.php?from=" + APIKEY,
    "https://du.shadiao.app/api.php?from=" + APIKEY
];
// 火力全开：https://nmsl.shadiao.app/api.php?from=xxx
// 口吐莲花：https://nmsl.shadiao.app/api.php?level=min&from=xxx
// 彩虹屁生成器：https://chp.shadiao.app/api.php?from=xxx
// 朋友圈文案生成器：https://pyq.shadiao.app/api.php?from=xxx
// 毒鸡汤生成器：https://du.shadiao.app/api.php?from=xxx


var select=false;
var select_index=0;
var d = dialogs.build({
    title: "请选择模式",
    positive: "确定",
    negative: "取消",
    items: ["一言", "火力全开", "口吐莲花", "彩虹屁生成器", "朋友圈文案生成器", "毒鸡汤生成器"],
    itemsSelectMode: "select"
}).on("item_select", (index, item, dialog) => {
    toast("您选择的是: " + item);
    select_index=index;
    select=true;
}).show();
while(!select){
    sleep(100);
}

sendMsg();

function sendMsg() {
    var i = 0;
    var Count = 1;
    Count = rawInput("发送条数", 1);
    var sleepTime = 5000
    sleepTime = rawInput("休息时间", 5000);
    var flag = true;
    while (flag) {

        http.get(select_index!=0 ? apiLink[select_index] : apiLink[0], {}, function (res, err) {
            if (err) {
                console.error(err);
                return;
            }

            var json = select_index!=0  ? res.body.string() : res.body.json().hitokoto;
            if (i >= Count) {
                flag = false;
                return;
            }
            i++;
            setText(json);
            text("发送").click();

        });
        sleep(sleepTime);
    }
}


