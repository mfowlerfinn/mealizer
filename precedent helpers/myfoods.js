var _newFoodModel = null;
var _isSavingFood = false;

$(document).ready(function() {
  wireUpMyFoodsListView();

  wireUpTopTabStrip();

  $("#createfoodButton").click(function() {
    var hasInitalized = $("#myfoods-list").data("initalized");

    //Defer loading until the button has been clicked
    if (!hasInitalized) {
      initalizeMyFoodList();
    }

    //Set the icon to the create icon
    $(".k-window-title").addClass("add");

    resetMyFoods();
    var window = $("#myfood-window").data("kendoWindow");
    window.center();
    window.open();
  });
});

function wireUpTopTabStrip() {
  $(".command-top-outer", "#myfoodlist-wrapper").click(function(e) {
    $(".command-top-outer", "#myfoodlist-wrapper").removeClass("selected");
    $(this).addClass("selected");

    rebindMyFoods();

    e.preventDefault();
  });
}

function wireUpMyFoodsListView() {
  var dataSource = new kendo.data.DataSource({
    transport: {
      read: {
        url: _userServicePath + "myfoods?sort=" + getSortOrder(),
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: {
          sortOrder: getSortOrder()
        }
      }
    },
    change: function(e) {
      //alert("changed");
    }
  });

  $("#myfoods-list").kendoListView({
    dataSource: dataSource,
    template: myFoodsTemplate
  });
  //kendo.ui.progress($("#myfoods-list"), false)
}

function initalizeMyFoodList() {
  myFoodsWireUpWindow();
  myFoodsWireUpNutritionalBox();
  myFoodsWireUpSave();
  myFoodsWireUpServingSize();

  $("#myfoods-list").data("initalized", true);
}

function getSortOrder() {
  if ($(".command-top-outer.myfoods").hasClass("selected")) {
    return "Alphabetical";
  } else {
    return "MostUsed";
  }
}

function myFoodsWireUpServingSize() {
  /*
    var items = [{ text: "cup", value: "cup" },
                 {text: "tbsp", value: "tbsp"},
                 { text: "oz", value: "oz" },
                 {text: "tsp", value: "tsp"}];

    $("#myfood-serving-type").kendoComboBox({
        dataSource: items = items,
        dataTextField: "text",
        dataValueField: "value",
        animation: false,
        index: 1
    });
    */
}

function deleteMyFoodItem(NdbNo) {
  $.ajax({
    type: "DELETE",
    url: _userServicePath + "/myfoods",
    data: '{"ndbNumber":"' + NdbNo + '"}',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(msg) {
      $("#myfoods-list li[data-NdbNo='" + NdbNo + "']").remove();
    }
  });
}

function rebindMyFoods() {
  var myfoodslistview = $("#myfoods-list").data("kendoListView");
  if (myfoodslistview) {
    myfoodslistview.dataSource.read();
  }
}

function myFoodsWireUpNutritionalBox() {
  _newFoodModel = kendo.observable({
    Foodname: "",
    Measure: {
      Size: "1",
      Text: "",
      GramCount: "1"
    },
    data: {
      ServingSize: "0",
      Grams: "0",
      ServingType: "0",
      Calories: "0",
      CalsFromFat: "0",
      TotalFat: "0",
      SaturatedFat: "0",
      TransFat: "0",
      Cholesterol: "0",
      Sodium: "0",
      Potasium: "0",
      Carbs: "0",
      DietaryFiber: "0",
      Sugar: "0",
      Protein: "0",
      VitaminA: "0",
      VitaminC: "0",
      Calcium: "0",
      Iron: "0"
    },
    MeasureTypes: [
      { text: "cup", value: "cup" },
      { text: "tbsp", value: "tbsp" },
      { text: "oz", value: "oz" },
      { text: "tsp", value: "tsp" }
    ]
  });

  kendo.bind($("#myfood-view"), _newFoodModel);

  /*
    //Create the Numeric Text Boxes
    $(".my-food-nutinfo-input.grams").kendoNumericTextBox({
        format: "# g",
        min: 0
    });

    $(".my-food-nutinfo-input.mgrams").kendoNumericTextBox({
        format: "# mg",
        min: 0
    });

    $(".my-food-nutinfo-input.percent").kendoNumericTextBox({
        format: "#%",
        min: 0
    });

    $("#myfood-serving-count").kendoNumericTextBox({
        min: 0
    });
    */
}

function myFoodsWireUpWindow() {
  //Create the Kendo Window
  var windowDiv = $("#myfood-window");
  windowDiv.kendoWindow({
    actions: ["Close"],
    draggable: true,
    //height: "300px",
    modal: true,
    resizable: false,
    title: "Add New Food",
    width: "400px",
    visible: false
  });

  windowDiv.removeAttr("style"); //Window is okay to show now
}

function myFoodsWireUpSave() {
  //Wire up the Save Button
  $("#save-button").click(function() {
    var foodName = _newFoodModel.get("Foodname");

    var dto = {
      foodname: foodName,
      nutritionaldata: _newFoodModel.get("data"),
      measuredata: _newFoodModel.get("Measure")
    };

    var dtoString = JSON.stringify(dto);

    if (foodName !== "" && _isSavingFood === false) {
      $.ajax({
        type: "POST",
        url: _userServicePath + "myfoods/add",
        data: dtoString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function() {
          $("#save-button")
            .val("Saving...")
            .css("background-color", "#e6e6e6");
          _isSavingFood = true;
        },
        success: function(data) {
          var result = data.d;

          if (result != -1) {
            $("#commands-msg-inner")
              .html("Success")
              .attr("class", "success")
              .delay(3000)
              .fadeOut(500);

            rebindMyFoods();

            var window = $("#myfood-window").data("kendoWindow");
            window.close();
          } else {
            $("#myfoods-error")
              .html("Error Adding New Food")
              .attr("class", "error")
              .delay(3000)
              .fadeOut(500);
          }
        },
        complete: function(e) {
          $("#save-button")
            .val("Save")
            .removeAttr("style");
          _isSavingFood = false;
        },
        error: function(data) {
          alert("Error Saving");
        }
      });
    } else {
      $("#myfoods-error")
        .html("Title Required")
        .show()
        .delay(3000)
        .fadeOut();
    }
  });
}

function resetMyFoods() {
  $("#myfoods-newfoodtext").val("");
}

var myFoodsTemplate = kendo.template(
  "<li class='myfood-item accent-dash food-item' data-NdbNo='${NdbNo}'>\
                                        <span class='my-food-item-text' title='${Alias.Name}' onclick='researchItem(\"${Alias.Name}\"); return false;'>${Alias.Name}</span>\
                                        <a id='delete-NdbNo-${NdbNo}'  href='\\#' class='delete-item' title='Remove ${NdbNo}' onclick='deleteMyFoodItem(\"${NdbNo}\"); return false;'></a>\
                                    </li>"
);
