

var model = (function () {

    var items = [];

    function toDoItem(toDoText) {
        this.toDo = toDoText;
    };
    function postojiELement(item) {
        var postoji = false;
        for (var i = 0; i < items.length; i++) {
            if (item == items[i].toDo) {
                postoji = true;
            }
            
        }
        return postoji;
    };


    return {
        addNewItemToModel: function (text) {
            var item = new toDoItem(text);
            if (!postojiELement(text)) {
                items.push(item);
                return item;
            } else {
                console.log('Postoji element');
                return -1;
            }


        },

        removeItemFromArray: function (itoremove) {
         
            var t = items.filter(function (item, index) {
                if (itoremove.indexOf(index) == -1) {
                    return item;
                }
            }); items = t;
            return itoremove;
        },

        allToDOItems: function () {
            return items;
        }
    }


})();
var view = (function () {
    var DOMString = {
        myList: 'myList',
        deleteBtn: 'button2',
        addBtn: "button1",
        userInput: '#userInput',
        checkbox: '.checkbox'


    };
    return {

        getInput: function () {

            return document.querySelector(DOMString.userInput).value;

        },


        looksForChecked: function () {
            var b = document.querySelector(DOMString.checkbox);

            niz = [];

            for (i = 0; i < b.length; i++) {

                if (b[i].checked == true) {
                    niz.push(i);
                }
            }
            return niz;
        },

        addItemToView: function (text) {
            var lista = document.getElementById(DOMString.myList);

            var listItem = document.createElement('li');
            var check = document.createElement('input');

            check.setAttribute('type', 'checkbox');
            check.setAttribute('class', 'checkbox');
            check.addEventListener('change', function () {
                console.log(this.text);
            });
            var spanEl = document.createElement('span');
            spanEl.innerText = text;
            spanEl.setAttribute('class', 'forTrash');

            listItem.appendChild(check);
            listItem.appendChild(spanEl);
            lista.appendChild(listItem);
            userInput.value = '';

        },
        clearFields: function () {
            polja = document.querySelectorAll(DOMString.userInput);

            poljaNIz = Array.prototype.slice.call(polja);
            poljaNIz.forEach(element => {
                element.value = '';
            });
            poljaNIz[0].focus();
        },

        deleteFromView: function () {
            var lista = document.getElementById(DOMString.myList);
            var listItems = lista.children;
            for (var i = 0; i < listItems.length; i++) {
                if (listItems[i].children[0].checked) {
                    listItems[i].parentElement.removeChild(listItems[i]);
                }
            }
        },
        getDOMStrings: function () {
            return DOMString;
        }
    };


})();
var controler = (function (m,v) {

    var setupEventLiseners = function () {

        var DOM = v.getDOMStrings();
        var a = document.getElementById(DOM.addBtn);
        a.onclick = ctrAddItem;

        var d = document.getElementById(DOM.deleteBtn);
        d.onclick = ctrlDeleteItem;
    };
    var ctrAddItem = function () {

        var input = v.getInput();
        if (input.trim() !== '') {

            var newItem = m.addNewItemToModel(input);
             
            if (newItem !== -1) {
              var newItem=v.addItemToView(input);
              v.clearFields(); 
             
            }
            
         
        }
        // var brisi=v.clearFields();
     
    };
    var ctrlDeleteItem = function () {
        var cekirano = v.looksForChecked();
        var newArray = m.removeItemFromArray(cekirano);
       

        v.deleteFromView();
        


    }




    return {

        init: function () {
            setupEventLiseners();
        }
    }


})(model, view);
controler.init();