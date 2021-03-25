function addBlog(){
    alert("You Have Sucessfully added data")
    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;
    var imageInfo = document.getElementById("imageId").files[0].name;
    console.log(title)
    console.log(desc);
    console.log(imageInfo);
    document.getElementById("titleInfo").innerHTML=title;
    document.getElementById("descInfo").innerHTML=desc;
    document.getElementById("imageInfo").src=imageInfo;
    var data = readformData();
    blogobj.push(data);
    if(this.imageinfo && localStorage){
        window.localStorage.setItem(imageinfo, this.imageinfo)
        alert("image stored in loacl storage")
        showimages();
    }
    else{
        alert("not sucess")
    }
    
}

}

var blogobj = [];
function storeinsession(){
    sessionStorage.setItem("bloginfo"blogobj);
}
function storefromsession(){
    var obj = sessionStorage.getItem("bloginfo");
    console.log(obj);
}

function readformData(){
      var obj = {}
      obj title = document.getElementById("title").value;
      obj desc = document.getElementById("desc").value;
      obj imageInfo = document.getElementById("imageId").src
      console.log(obj);
      return obj;

}