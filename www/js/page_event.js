// This is a JavaScript file
document.addEventListener('init', function(event) {
      var page = event.target;
      //var titleElement = document.querySelector('#toolbar-title');

      if (page.matches('#first-page')) {
       // titleElement.innerHTML = 'My app - ホームページ';
        var target_time;
        var sport_time_count=0;

        ons.ready(function() { 
            var show_target_time = parseInt(localStorage.getItem("TargetTime"))/3600;
            page.querySelector('div .percent').innerHTML = show_target_time.toFixed(1)+"h";
            circle();
        });
        page.querySelector('#target_prompt').onclick =　function disp_prompt() {  
          sport_time_count=0;
          var time = prompt("目標の運動時間(時単位)","10")*3600; // 弹出input框 
          /*if (localStorage.getItem("sportKey) >= localStorage.getItem("targetKey")){
                localStorage.removeItem("targetKey");
                localStorage.setItem("targetKey",time);
          } else {
                page.querySelector('div .percent').innerHTML = localStorage.getItem("targetKey");
                target_time=time;
          }
          */
          localStorage.setItem("TargetTime",time); 
          localStorage.setItem("SportTime_Count",sport_time_count);
          var show_target_time = parseInt(localStorage.getItem("TargetTime"))/3600;
          page.querySelector('div .percent').innerHTML = show_target_time.toFixed(1)+"h";
          circle();
          //return target_time;
        } 
        
        var intervalId;
        var i = 0;
        var count=0;
        page.querySelector('#timer_start').onclick =　function startTime(){
          var hour = document.getElementById("timer_hour");
          var minute = document.getElementById("timer_minute");
          var second = document.getElementById("timer_second");
          var buttonEle = document.getElementById("timer_start");

          page.querySelector('#timer_clear').onclick =　function clearTime(){
            count = 0;
            hour.innerHTML="00 ";
            minute.innerHTML="00 ";
            second.innerHTML="00 ";
            localStorage.setItem("SportTime",0);

          }


          if(i%2==0){
            buttonEle.innerHTML="タンマ";
            intervalId = setInterval(function(){
                count += 1;
                var thehour=parseInt(count/360000);
                var theminute=parseInt(count/6000%60);
                var thesecond=parseInt(count/100%60);

                if(thehour>=10){
                  hour.innerHTML=thehour+" ";
                }　else　{
                      hour.innerHTML="0"+thehour+" ";
                }

                if(theminute>=10){
                  minute.innerHTML=theminute+" ";
                }　else　{
                      minute.innerHTML="0"+theminute+" ";
                }

                if(thesecond>=10){
                  second.innerHTML=thesecond+" ";
                }　else　{
                      second.innerHTML="0"+thesecond+"  ";
                }
            },10)
          }　else　{
                buttonEle.innerHTML="計時開始";
                localStorage.removeItem("SportTime");
                localStorage.setItem("SportTime",count/100);
                clearInterval(intervalId);
          }
          i++;
      }
      //記録
      page.querySelector('#timer_send').onclick =　function saveMemo() {
        var timer_sport = document.getElementById("timer_sport").value;
        var time_input = document.getElementById("timer_input").value*3600;
        var timer_memo = document.getElementById("timer_memo").value;
        var sport_time = parseInt(localStorage.getItem("SportTime"));
        var target_time = parseInt(localStorage.getItem("TargetTime"));

        sport_timeA=sport_time + time_input;
        sport_time_count = sport_time_count + sport_timeA;
        localStorage.setItem("SportTime_Count",sport_time_count);
        var rest_time = (target_time - sport_time_count)/3600;
        if (sport_time_count < target_time){
          page.querySelector('div .percent').innerHTML = rest_time.toFixed(1)+"h";
          page.querySelector('ons-list-item .show_Vue').innerHTML += timer_sport+": "+(sport_timeA/60).toFixed(0)+"分    Memo:"+timer_memo+"<br />";
          circle();
        }else{
          circle();
          
          var timeall = parseInt(localStorage.getItem("SportTime_Count_ALL"));
          timeall = timeall + sport_time_count;
          localStorage.setItem("SportTime_Count_ALL",timeall);
          
          page.querySelector('div .percent').innerHTML = rest_time.toFixed(1)+"h";
          page.querySelector('ons-list-item .show_Vue').innerHTML += timer_sport+": "+(sport_timeA/60).toFixed(0)+"分    Memo:"+timer_memo+"<br />";
          var tank = tank + 1;
          localStorage.setItem("Tank",tank);
          localStorage.removeItem("TargetTime");
          localStorage.removeItem("SportTime_Count");
          sport_time_count = 0;
          alert("目標達成!!!");
          
        }
        


        //console.log(target_time,timer_sport,sport_time,timer_memo);
        /*//Send the data to database
        var TimeClass = ncmb.DataStore("TimeClass");
        var TimeClass = new TimeClass();
        TimeClass.set("TargetTime", target_time)
                   .set("SportType", timer_sport)
                   .set("SportTime", sport_time)
                   .set("Memo", timer_memo)
                   .save()
                   .then(function(object){
             // 保存に成功した場合の処理
                  document.querySelector('#myNavigator').pushPage('tab.html');
                })
                   .catch(function(err){
             // 保存に失敗した場合の処理
          });*/
      }
      } else if (page.matches('#second-page')) {
        //titleElement.innerHTML = 'My app - 個人ページ';AddUserdata.html
        
          ons.ready(function() { 
            var weight = localStorage.getItem("Weight");
            var height = localStorage.getItem("Height");
            var b_year = localStorage.getItem("Birthday");
            b_year = b_year.substr(0, 4); 
            var date = new Date();
            var n_year = date.getFullYear(); 
            var age = n_year - b_year;

            page.querySelector('ons-list-item .user_data1').innerHTML = localStorage.getItem("Username");
            if(localStorage.getItem("UserSex") == 1){
                    var sex_text = '男性';
                    var bmr =10*weight + 6.25*height - 5*age + 5;
                }else{
                    var sex_text = '女性';
                    var bmr =10*weight + 6.25*height  -5*age - 161;
                }
                page.querySelector('ons-list-item .user_data2').innerHTML = "年齢: "+age+"　 性別: "+sex_text+"<br />";
                page.querySelector('ons-list-item .user_data2').innerHTML += "身長: "+height+"cm 　体重: "+weight+"Kg  ";
            
                var bmi=weight/(height*height/10000);
                page.querySelector('ons-list-item .user_data3').innerHTML += "BMI: "+Math.round(bmi*100)/100+"<br />";
                var message = "あなたは";
                if(bmi < 18.5) {
                  message += "低体重(痩せ型)です。";
                } else if (bmi >= 18.5 && bmi < 25) {
                  message += "普通体重です。";
                } else if (bmi >= 25 && bmi < 30) {
                  message += "肥満(1度)です。";
                } else if (bmi >= 30 && bmi < 35) {
                  message += "肥満(2度)です。";
                } else if (bmi >= 35 && bmi < 40) {
                  message += "肥満(3度)です。";
                } else if (bmi >= 40) {
                  message += "肥満(4度)です。";
                }
                
                page.querySelector('ons-list-item .user_data3').innerHTML += "BMR: "+bmr+"<br />";
                page.querySelector('ons-list-item .user_data3').innerHTML += message+"<br />";
                


          /* //get the data from database
          var UserdataClass = ncmb.DataStore("UserdataClass");
          UserdataClass.fetchAll()
            .then(function(results){
              for (var i = 0; i < results.length; i++) {
                var object = results[i];
                page.querySelector('ons-list-item .user_data1').innerHTML = object.get("username");
                if(object.get("sex") == 1){
                    var sex_text = '男性';
                }else{
                    var sex_text = '女性';
                }
                page.querySelector('ons-list-item .user_data2').innerHTML = "生年月日: "+object.get("birthday")+"　 性別: "+sex_text;
                page.querySelector('ons-list-item .user_data2').innerHTML += "<br />身長: "+object.get("height")+"cm 　体重: "+object.get("weight")+"Kg  ";
                var weight = object.get("weight");
                var height = object.get("height");
                var bmi=weight/(height*height/10000);
                page.querySelector('ons-list-item .user_data2').innerHTML += "BMI: "+Math.round(bmi*100)/100+"<hr />";
                var message = "あなたは";
                if(bmi < 18.5) {
                  message += "低体重(痩せ型)です。";
                } else if (bmi >= 18.5 && bmi < 25) {
                  message += "普通体重です。";
                } else if (bmi >= 25 && bmi < 30) {
                  message += "肥満(1度)です。";
                } else if (bmi >= 30 && bmi < 35) {
                  message += "肥満(2度)です。";
                } else if (bmi >= 35 && bmi < 40) {
                  message += "肥満(3度)です。";
                } else if (bmi >= 40) {
                  message += "肥満(4度)です。";
                }
                page.querySelector('ons-list-item .user_data2').innerHTML += message+"<br />";


              }
            })
            .catch(function(err){
              console.log(err);
            });*/
        }); 
      } else if (page.matches('#third-page')){

        var tank_number = parseInt(localStorage.getItem("Tank"));
        var sport_time_all=Math.round(parseInt(localStorage.getItem("SportTime_Count_ALL"))/3600);
        page.querySelector('div .sport_time').innerHTML =sport_time_all+"時間";
        page.querySelector('div .tank_number').innerHTML = "目標完成数: "+tank_number;
        var change_weight =0;

        if(tank_number = 0){
          var show_tank = 0;
        } else{
          var show_tank = tank_number;
        }

        if(change_weight > 0){
            var weight_text= change_weight +"kg 減少しました!";
        }else if(change_weight == 0){
                var weight_text= "変化がないです。";
              }else {
                var weight_text= "もっと頑張って!";
              }
        var calorie_all =  sport_time_all*100;
        page.querySelector('div .weight_change').innerHTML =weight_text;
        page.querySelector('div .calorie').innerHTML =calorie_all;




        var data1 = {
            labels: ["Tank1", "Tank2", "Tank3", "Tank4", "Tank5", "Tank1"],
            datasets: [
                {
                    label: "運動時間",
                    backgroundColor: ['rgba(255, 99, 132, 0.2)',
                                      'rgba(54, 162, 235, 0.2)',
                                      'rgba(255, 206, 86, 0.2)',
                                      'rgba(75, 192, 192, 0.2)',
                                      'rgba(153, 102, 255, 0.2)',
                                      'rgba(255, 159, 64, 0.2)'
                                    ],
                    borderColor: [
                                      'rgba(255,99,132,1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 206, 86, 1)',
                                      'rgba(75, 192, 192, 1)',
                                      'rgba(153, 102, 255, 1)',
                                      'rgba(255, 159, 64, 1)'
                                   ],
                    data: [sport_time_all, 0, 0, 0, 0, 0],
                    borderWidth: 1
                }
            ]
        };
        var ctx1 = document.getElementById("chart-canvas");
        
        new Chart(ctx1, {
            type: "bar",
            data: data1,
            
        });

        var data2 = {
            labels: ["サッカー", "水泳", "散歩", "〜", "〜", "〜"],
            datasets: [
                {
                    label: "運動別",
                    backgroundColor: ['rgba(255, 99, 132, 0.2)',
                                      'rgba(54, 162, 235, 0.2)',
                                      'rgba(255, 206, 86, 0.2)',
                                      'rgba(75, 192, 192, 0.2)',
                                      'rgba(153, 102, 255, 0.2)',
                                      'rgba(255, 159, 64, 0.2)'
                                    ],
                    borderColor: [
                                      'rgba(255,99,132,1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 206, 86, 1)',
                                      'rgba(75, 192, 192, 1)',
                                      'rgba(153, 102, 255, 1)',
                                      'rgba(255, 159, 64, 1)'
                                   ],
                    data: [8, 2, 11, 0, 11, 13],
                    borderWidth: 1
                }
            ]
        };
      

        var ctx2 = document.getElementById("chart-canvas2");
        new Chart(ctx2,{
            type:"doughnut",
            data:data2
        });

        page.querySelector('#reload').onclick = function() {
            document.location.reload();
        }
      
      } else if (page.matches('#AddUser')){
          page.querySelector('#push-button').onclick = function() {
          var username　=　document.getElementById("user_name").value;
          var height　=　document.getElementById("user_height").value;
          var weight　=　document.getElementById("user_weight").value;
          var birthday　=　document.getElementById("user_birthday").value;
          var sex　=　document.getElementById("user_sex").value;

          //Save the data in local
          localStorage.setItem("Username",username);
          localStorage.setItem("Height",height);
          localStorage.setItem("Weight",weight);
          localStorage.setItem("Birthday",birthday);
          localStorage.setItem("UserSex",sex); 

          document.querySelector('#myNavigator').pushPage('tab.html');

          /* //Send the userdata to database 
          var UserdataClass = ncmb.DataStore("UserdataClass");
          var UserdataClass = new UserdataClass();

          UserdataClass.set("username", username)
                   .set("height", height)
                   .set("weight", weight)
                   .set("birthday", birthday)
                   .set("sex", sex)
                   .save()
                   .then(function(object){
             // 保存に成功した場合の処理
                  document.querySelector('#myNavigator').pushPage('tab.html');
                })
                   .catch(function(err){
             // 保存に失敗した場合の処理
          }); */

        };
      }
    });
