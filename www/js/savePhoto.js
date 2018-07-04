/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 var apikey = "fc3a8b35e955fe5f0a83a49be8c1e60a5321974325e10739e7f8734b27665bb4";
 var clientkey = "f8e0a822a6a2956144237a5a2ece5053bc2f6ca392835b70fcaf1f6b3b5d609f";
var ncmb = new NCMB(apikey, clientkey);

//ファイルの選択
function selectFile(){
  var reader = new FileReader();
  reader.onload = function(e) {
    var dataUrl = reader.result;
    document.getElementById("image").src = dataUrl;
  }
   // ファイルを選択したら実行
  var photo = document.getElementById("photo");
  photo.addEventListener('change', function(e) {
    e.preventDefault();
    var file = e.target.files[0];
    if (file.name !="" ){
// var myDate = new Date();
// var mytime = Date.prototype.toString(myDate.toLocaleString());
    document.getElementById("filename").value = mytime + ".jpeg"
    }
    document.getElementById("filename").value = file.name
    reader.readAsDataURL(file);
  }, false);
   
}

//ファイルのアップロード
function uploadFile(){
    var ncmb = new NCMB(apikey, clientkey);
   // ファイル名、ファイルデータを取得
    var fileName = document.getElementById("filename").value;
    var fileData = dataURItoBlob(document.getElementById("image").src);
    
    // アップロード
    ncmb.File.upload(fileName, fileData)
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.error(err);
      })
      
}
//ファイルのダウンロード
function downloadFile(){
    var ncmb = new NCMB(apikey, clientkey);
   // ファイル名を取得
    var fileName = document.getElementById("filename").value;
      var reader = new FileReader();
 reader.onload = function(e) {
   var dataUrl = reader.result;
   document.getElementById("image").src = dataUrl;
 }

    // ダウンロード（バイナリなのでblobを指定）
    ncmb.File.download(fileName, "blob")
      .then(function(blob) {
        // ファイルリーダーにデータを渡す
        reader.readAsDataURL(blob);
      })
      .catch(function(err) {
        console.error(err);
      })
}
// dataURIをBlobに変換
function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}
//
//function onDiviceReady() {
//  
//  var reader = new FileReader();
//  reader.onload = function(e) {
//    var dataUrl = reader.result;
//    document.getElementById("image").src = dataUrl;
//  }
//  
//  // ファイルを選択したら実行
//  var photo = document.getElementById("photo");
//  photo.addEventListener('change', function(e) {
//    e.preventDefault();
//    var file = e.target.files[0];
//    document.getElementById("filename").value = file.name
//    reader.readAsDataURL(file);
//  }, false);
//  
//  // ファイルアップロード
//  var submit = document.getElementById("submit");
//  submit.addEventListener("click", function(e) {
//    e.preventDefault();
//    // ファイル名、ファイルデータを取得
//    var fileName = document.getElementById("filename").value;
//    var fileData = dataURItoBlob(document.getElementById("image").src);
//    
//    // アップロード
//    ncmb.File.upload(fileName, fileData)
//      .then(function(res) {
//        console.log(res);
//      })
//      .catch(function(err) {
//        console.error(err);
//      })
//  }, false)
//  
//  // ファイルダウンロード
//  var view = document.getElementById("view");
//  view.addEventListener("click", function(e) {
//    e.preventDefault();
//    // ファイル名を取得
//    var fileName = document.getElementById("filename").value;
//    
//    // ダウンロード（バイナリなのでblobを指定）
//    ncmb.File.download(fileName, "blob")
//      .then(function(blob) {
//        // ファイルリーダーにデータを渡す
//        reader.readAsDataURL(blob);
//      })
//      .catch(function(err) {
//        console.error(err);
//      })
//  }, false);
//}



// document.addEventListener("deviceready", onDiviceReady, false);