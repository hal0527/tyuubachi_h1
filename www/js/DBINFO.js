// This is a JavaScript file

// APIキーの設定とSDK初期化
// var ncmb = new NCMB("fc3a8b35e955fe5f0a83a49be8c1e60a5321974325e10739e7f8734b27665bb4","f8e0a822a6a2956144237a5a2ece5053bc2f6ca392835b70fcaf1f6b3b5d609f");

var apikey = "fc3a8b35e955fe5f0a83a49be8c1e60a5321974325e10739e7f8734b27665bb4";
 var clientkey = "f8e0a822a6a2956144237a5a2ece5053bc2f6ca392835b70fcaf1f6b3b5d609f";

var arr_timeList;

// ↓　ここにサンプルコードを実装　↓
function save_Active_info(){
  var ncmb = new NCMB(apikey,clientkey);
    // 保存先クラスの作成
    var TestClass = ncmb.DataStore("Active_Info");

    // 保存先クラスのインスタンスを生成
    var testClass = new TestClass();
      // alert("aaa");
    // 画面入力項目値を取る
      var active_date=document.getElementById("active_date").value;
      var active_times=document.getElementById("active_times").value;
      var user_sport=document.getElementById("user_sport").value;
     var week_day=document.getElementById("week_day").value;

    // 値を設定と保存
    testClass.set("active_date",active_date)
                .set("active_times", active_times)
                .set("user_sport", user_sport)
                .set("week_day", week_day)
            .save()
            .then(function(object){
                // 保存に成功した場合の処理
          alert("実績が保存されました");
            })
            .catch(function(err){
                // 保存に失敗した場合の処理
          alert("実績保存が失敗しました");
            });
}

function get_Active_info(){
  var ncmb = new NCMB(apikey,clientkey);
  
  alert("aa");
    // 保存先クラスの作成
    var TestClass = ncmb.DataStore("Active_Info");
alert("get_Active_info");
    arr_timeList = new Array(["月曜日",0],
                                         ["火曜日",0],
                                         ["水曜日",0],
                                         ["木曜日",0],
                                         ["金曜日",0],
                                         ["土曜日",0],
                                         ["日曜日",0]);
    TestClass.fetchAll().then(function(results){
//TestClass.fetchAll().then(() =>{
    
        for (var i = 0; i < results.length; i++) {
          var object = results[i];  
                if ( object.get("week_day") == "月曜日" ){
                    arr_timeList[0][1] =  arr_timeList[0][1]  + parseInt( object.get("active_times"));
                }
                else if ( object.get("week_day") == "火曜日" ){
                    arr_timeList[1][1] = arr_timeList[1][1]  +  parseInt( object.get("active_times"));
                }
                else if ( object.get("week_day") == "水曜日" ){
                    arr_timeList[2][1] = arr_timeList[2][1]  +  parseInt( object.get("active_times"));
                }
                else if ( object.get("week_day") == "木曜日" ){
                    arr_timeList[3][1] = arr_timeList[3][1]  +  parseInt( object.get("active_times"));
                }
                else if ( object.get("week_day") == "金曜日" ){
                    arr_timeList[4][1] = arr_timeList[4][1]  +  parseInt( object.get("active_times"));
                }
                else if ( object.get("week_day") == "土曜日" ){
                    arr_timeList[5][1] = arr_timeList[5][1]  +  parseInt( object.get("active_times"));
                }
                else if ( object.get("week_day") == "日曜日" ){
                    arr_timeList[6][1] = arr_timeList[6][1]  +  parseInt( object.get("active_times"));
                }
        }
       res();   
      })
      .catch(function(err){
        console.log(err);
      })
      .then(function(){
        show_chart();
      });
}

// chartの表示
function show_chart(){
		var config = {
			type: 'line',
			data: {
//				labels: [['June', '2015'], 'July', 'August', 'September', 'October', 'November', 'December', ['January', '2016'], 'February', 'March', 'April', 'May'],
	labels: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'],			
            datasets: [{
					label: '週運動実績',
					fill: false,
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,

					data: [
						arr_timeList[0][1] ,
						arr_timeList[1][1] ,
						arr_timeList[2][1] ,
						arr_timeList[3][1] ,
						arr_timeList[4][1] ,
						arr_timeList[5][1] ,
						arr_timeList[6][1] 
					]

				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
//					text: 'Chart with Multiline Labels'
				},
			}
		};


			var ctx = document.getElementById('canvas').getContext('2d');
			window.myLine = new Chart(ctx, config);

}

