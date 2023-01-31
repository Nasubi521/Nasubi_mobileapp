"use strict"

document.addEventListener("DOMContentLoaded",
function(){
    if(typeof localStorage === "undefined"){
        alert("こ");
        return;
    }
    else{
        viewStorage();
        saveLocalStorage();
        selectTable();
        dellocalStorage();
        allClearLocalStorage();
    }
},false
);

function saveLocalStorage(){
    let save = document.getElementById("save");
    save.addEventListener("click",
    function(e){
        // console.log("1");
        e.preventDefault();
        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        if(key == "" || value == "")
        {
            alert("Key、Memoはいずれも必須です。");
            return;
        }
        else
        {
            let w_confirm = confirm("LocalStorageに\n「" + key + " " + value + "」\nを保存しますか")
            if(w_confirm){
                localStorage.setItem(key, value);
                viewStorage();
                let w_msg = "LocalStorage" + key + " " + value + "を保存しました";
                alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
        }
            }
           
    },false
    );
};

function selectTable(){
    let select = document.getElementById("select");
    select.addEventListener("click",
    function(e){
        // console.log('1');
        e.preventDefault();
        selectCheckBox()
    },false
    );
}

function dellocalStorage(){
    let del = document.getElementById("del");
    del.addEventListener("click",
    function(e){
        e.preventDefault();
        let w_sel = '0';
        w_sel = selectCheckBox()

        if(w_sel === "1"){
            const key =  document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            let w_confirm = confirm("LocalStorageから\n「" + key + value + "」\nをdeleteしますか？")
            if(w_confirm){
                localStorage.removeItem(key);
                viewStorage();
                let w_msg = "LocalStorageから" + key + value + "をdeleteしました。"
                alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = ""
            }


        }
    },false
    )
}

function allClearLocalStorage(){
    let allClear = document.getElementById("allClear")
    allClear.addEventListener("click",
        function(e){
            // console.log("1");
            e.preventDefault();
            let w_confirm = confirm("LocalStorageをall deleteします。\nよろしいでしょうか。")
            if(w_confirm == true){
                localStorage.clear();
                viewStorage();
                let w_msg = "LocalStorageをall deleteしました"
                window.alert(w_msg)
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";

            }
        },false
    )
}

function selectCheckBox(){
    let w_sel = "0";
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = ""
    let w_textMemo = ""
    // console.log(radio1);
    console.log(chkbox1.length);

    for(let i = 0; i < chkbox1.length;i++)
    {
        if(chkbox1[i].checked)
        {
            if(w_cnt === 0){
                w_textKey = table1.rows[i+1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
            }
            w_cnt++
        }
        
    }
    // console.log(w_cnt);
    document.getElementById("textKey").value = w_textKey
    document.getElementById("textMemo").value = w_textMemo
    if(w_cnt === 1){
        return w_sel = "1"
    }else{
        window.alert("１つ選択してください");
    }
    // console.log(w_cnt);
}

function viewStorage(){
    let list = document.getElementById("list");

    while(list.rows[0])
    list.deleteRow(0);

    for(let i = 0; i < localStorage.length;i++){
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
       
    }
    $("#table1").tablesorter({
        sortList:[[1,0]]
        
    });
    
    $("#table1").trigger("update");
}

