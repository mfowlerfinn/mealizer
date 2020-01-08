

var _userServicePath = "/Sitefinity/Public/Services/Calculator/Calculator.svc/";
var _usdaServiceBase = "/Sitefinity/Public/Services/USDA/Usda.svc/";
var _nutritioanlServiceBase = "/Sitefinity/Public/Services/USDA/Nutrition.svc/";
var _conversionServiceBase = "/Sitefinity/Public/Services/USDA/Conversion.svc/";
var _currentItem = null;
var _foodDS = null;
var _weightDS = null;
var _weightData = null;
var _autoCompleteCombo;
var _autoCompleteDS = null;
var _fromCombo = null;
var _toCombo = null;
var _quantityBox = null;
//var _enabled = false;
var _myFoodsDS = null;
var _validator = null;
var _mobile = null;

$(document).ready(function() {
  _foodDS = new kendo.data.DataSource();

  var column = "AliasDesc";
  var table = "usda_GSAlias";
  var userID = getCurrentUserID();
  if (userID === null || userID === "")
    userID = "00000000-0000-0000-0000-000000000000";

  //Create the autocomplete DS
  _autoCompleteDS = new kendo.data.DataSource({
    type: "json", //Specifies data protocol
    pageSize: 15, //Limits result set
    serverFiltering: true,
    serverPaging: true,
    transport: {
      read: _usdaServiceBase + "aliased",
      parameterMap: function() {
        return {
          search: _autoCompleteCombo.text(),
          take: 10,
          skip: 0,
          userid: userID
        };
      }
    },
    schema: {
      data: function(response) {
        return response.Items;
      },
      total: function(response) {
        return response.TotalCount;
      }
    },
    requestStart: function() {
      $("#loading").show();
    },
    change: function() {
      $("#loading").hide();
    }
  });

  _weightDS = new kendo.data.DataSource({
    type: "json", //Specifies data protocol
    serverFiltering: true,
    transport: {
      read: ""
    },
    schema: {
      data: function(response) {
        return response.Weight;
      }
    },
    change: function() {
      _weightData = this.data();

      var data = this.data();
      var selectionItems = [{ Seq: "0", Msre_Desc: "grams" }];
      for (var i = 0; i < data.length; i++) {
        selectionItems.push(data[i]);
      }

      _fromCombo.dataSource.data(selectionItems);
      _toCombo.dataSource.data(selectionItems);

      //Set the selected item to grams
      _fromCombo.select(0);
      if (data.length > 0) _toCombo.select(1);
      else _toCombo.select(0);
    }
  });

  _fromCombo = $("#from-select")
    .kendoDropDownList({
      index: 0,
      dataTextField: "Msre_Desc",
      dataValueField: "Seq",
      //dataSource: _weightData,
      autoBind: false,
      change: function() {
        /*if (!isMobile()) {
                setTimeout(function () {
                    $("#to-select").focus();
                    _toCombo.open();
                }, 150);
            }*/
      }
    })
    .data("kendoDropDownList");

  _toCombo = $("#to-select")
    .kendoDropDownList({
      index: 1,
      autoBind: false,
      dataTextField: "Msre_Desc",
      dataValueField: "Seq",
      //dataSource: _weightData,
      change: function(e) {
        /*
            if (!isMobile()) {
                setTimeout(function () {
                    $("#search-button").focus();
                }, 150);
            }
            */
      }
    })
    .data("kendoDropDownList");

  $("#quantity").val(""); //reset the value to 1, sometimes it's like 19830 for some reason

  wireUpLastUsed();
  enableKendoUI();
  wireEvents();
  wireUpValidation();
});

function wireUpLastUsed() {
  if (getCurrentUserID() !== "") {
    var historyDS = new kendo.data.DataSource({
      transport: {
        read: {
          url: _userServicePath + "history?skip=0&take=10",
          type: "GET",
          dataType: "json",
          contentType: "application/json; charset=utf-8"
        }
      }
    });

    $("#last-searched-list").kendoListView({
      dataSource: historyDS,
      template: lastusedSingleTemplate
    });
    //kendo.ui.progress($("#last-searched-list"), false)
  }
}

function wireUpValidation() {
  (_validator = $("#search-wrapper")
    .kendoValidator()
    .data("kendoValidator")),
    (status = $("#validation-status"));
}

function wireEvents() {
  $("#search-button").click(function(e) {
    if (_validator.validate()) {
      calculateResult();
      $("#validation-status").hide();
    } else {
      $("#validation-status")
        .stop()
        .fadeIn()
        .delay(3000)
        .fadeOut();
    }

    e.preventDefault();
  });

  $("#new-search-button").click(function(e) {
    _autoCompleteCombo.text("");
    _autoCompleteCombo.value("");
    _quantityBox.val("");
    _fromCombo.text("");
    //_fromCombo.enable(false);
    _toCombo.text("");
    //_toCombo.enable(false);
    // _enabled = false;
    $("#result").html("Please Search Above");
    $(this).hide();
    $("#food-box").focus();
    $("#results").hide();
    $("#nutrition-details").hide();
    $("#instructionsPanel").show();

    //Reset the nutrition box
    var data = {
      NDB_No: 0,
      Grams: 0,
      ServingSize: 0,
      MeasureType: "",
      Calories: 0,
      TotalFat: 0,
      SaturatedFat: 0,
      Cholesterol: 0,
      Sodium: 0,
      Potassium: 0,
      Carbohydrates: 0,
      DietaryFiber: 0,
      Sugars: 0,
      Protein: 0,
      TotalFatDailyPercent: 0,
      SaturatedFatDailyPercent: 0,
      CholesterolDailyPercent: 0,
      SodiumDailyPercent: 0,
      PotassiumDailyPercent: 0,
      CarbohydratesDailyPercent: 0,
      DietaryFiberDailyPercent: 0,
      ProteinDailyPercent: 0
    };

    $("#nutrition-results").html(nutritionTemplate(data));

    e.preventDefault();
  });

  //Add Food
  $("#add-button").click(function(e) {
    e.preventDefault();

    var ndbNo = $("#add-button").attr("ndbno");

    if (_currentItem !== null) {
      //Make sure this item isn't in the list already
      var exists = $("#delete-ndbno-" + ndbNo).length == 0 ? false : true;

      if (!exists) {
        $.ajax({
          type: "PUT",
          url: _userServicePath + "link",
          data: '{"ndbNumber":"' + ndbNo + '"}',
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(msg) {
            /*
                        var data = {
                            NDB_No : ndbNo,
                            AliasDesc : $("#add-button").attr("item")
                        }

                        var html = myfoodsSingleTemplate(data);

                        //hide the emptydatanode
                        $("#myfoods-list .emptydata").hide();

                        $("#myfoods-list").prepend(html);

                        wireUpDeleteMyFoodEvents(); //make the delete button work
                        */
            rebindMyFoods();

            $("#add-button").hide();
            $("#add-button-exists").show();
          }
        });
      }
    }
  });

  //Wire up chained focus on the qty box
  $("#quantity").keypress(function(e) {
    /*
        if (!isMobile()) {
            if (e.which == 13 || e.which == 0) {
                _fromCombo.open();
                //$("#from-select").focus();
            }
        }
        */
  });
}

function enableKendoUI() {
  _autoCompleteCombo = $("#food-box")
    .kendoComboBox({
      autoBind: false,
      animation: false,
      minLength: 3,
      filter: "contains",
      suggest: false,
      highlightFirst: true,
      dataTextField: "Alias.Name", //JSON property name to use
      dataValueField: "NdbNo", //JSON property name to use
      dataSource: _autoCompleteDS,
      close: function(e) {
        if (_currentItem != null) {
          setTimeout(function() {
            if (_currentItem.NDB_No != -999999) {
              _quantityBox.focus();
            } else {
              _autoCompleteCombo.text("");
              _autoCompleteCombo.value(null);
            }
          }, 100);
        }
      },
      change: function(e) {
        if (this._current) {
          var item = this.dataSource.view()[this._current.index()];
          _currentItem = item; //store the selected item

          if (item.NdbNo != -999999) {
            //Show the other inputs
            //$("#additional-options").slideDown();

            //Get the weight navproperty
            _weightDS.transport.options.read.url =
              _usdaServiceBase + "aliased/" + item.NdbNo;
            _weightDS.fetch();

            //if (_enabled == false) {
            //_fromCombo.enable();
            //_toCombo.enable();
            //_quantityBox.enable();
            _quantityBox.removeAttr("disabled");
            _enabled = true;
            //}

            var userid = getCurrentUserID();

            if (userid != "") {
              //Add to search history
              $.ajax({
                type: "PUT",
                url: _userServicePath + "history/add",
                data: '{"ndbNumber":"' + item.NdbNo + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(msg) {
                  rebindLastUsed();
                }
              });
            } else {
              //populateLocalFromLocal(item);
            }

            $("#last-searched-anoninstructions").remove();

            //REMOVED, call this from the add last used service method now
            /*
                    //Update View Count for the NDB
                    $.ajax({
                        type: "POST",
                        url: _webservicePath + "/UpdateViewCount",
                        data: "{'ndbNo':'" + item.NDB_No + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {

                        },
                        error: function (e) {
                            //Do Nothing
                        }
                    });
                    */

            var exists =
              $("[data-ndbno='" + item.NDB_No + "']").length == 0
                ? false
                : true;

            if (exists === false) {
              $("#add-button")
                .attr(
                  "title",
                  "Save " + item.Alias.Name + " to your personal My Foods area"
                )
                .attr("item", item.Alias.Name)
                .attr("ndbno", item.NdbNo)
                .show();
              $("#add-button-exists").hide();
            } else {
              $("#add-button").hide();
              $("#add-button-exists").show();
            }
          }
        }
      }
    })
    .data("kendoComboBox");

  //Hide the arrow om the combo
  _autoCompleteCombo._arrow
    .hide()
    .closest(".k-dropdown-wrap")
    .addClass("combo-to-autocomplete");

  _quantityBox = $("#quantity");

  //Set the ghost text
  _autoCompleteCombo.input.attr("placeholder", "Type here to start searching!");
  _quantityBox.attr("placeholder", "ex: 1.5 or 1 1/2");

  $("#calc-wrapper").removeAttr("style"); //Finished rendering, show control
}

function getCommonCookingFraction(value) {
  if (value < 0.05) {
    return "0";
  } else if (value < 0.188) {
    return "1/8";
  } else if (value < 0.292) {
    return "1/4";
  } else if (value < 0.417) {
    return "1/3";
  } else if (value < 0.584) {
    return "1/2";
  } else if (value < 0.71) {
    return "2/3";
  } else if (value < 0.92) {
    return "3/4";
  } else {
    return "1";
  }
}

function calculateResult() {
  var quantity = _quantityBox.val();
  var fromList = $("#from-select").data("kendoDropDownList");
  var toList = $("#to-select").data("kendoDropDownList");

  var toDataItem = getWeightDataItem(
    _currentItem.NdbNo,
    toList.text(),
    toList.value()
  );

  var convertQueryURL =
    _conversionServiceBase +
    "?ndbno=" +
    toDataItem.NDB_No +
    "&seq=" +
    toDataItem.Seq +
    "&qty=" +
    quantity +
    "&from=" +
    fromList.text() +
    "&fromID=" +
    fromList.value() +
    "&to=" +
    toList.text() +
    "&toID=" +
    toList.value();
  var nutritionQueryUrl =
    _nutritioanlServiceBase + "?ndbno=" + toDataItem.NDB_No;

  //Calculate Result
  $("#result").html("Calculating Result...one moment please");

  $.get(convertQueryURL, function(data) {
    var convertedValue = data;

    var commonCookingNumber =
      parseInt(convertedValue) > 0 ? parseInt(convertedValue) : 0;

    var commonCookingFraction = getCommonCookingFraction(
      parseFloat(convertedValue).toFixed(3) - parseInt(convertedValue)
    );
    if (commonCookingFraction == "0") {
      commonCookingFraction = "";
    } else if (commonCookingFraction == "1") {
      commonCookingFraction = "";
      commonCookingNumber++;
    }

    if (
      commonCookingNumber == 0 &&
      commonCookingFraction != "0" &&
      commonCookingFraction != ""
    ) {
      commonCookingNumber = "";
    }

    $("#calcResult").html(
      quantity +
        " " +
        fromList.text() +
        " = " +
        commonCookingNumber +
        " " +
        commonCookingFraction +
        " " +
        toList.text() +
        "<br /><span>(" +
        parseFloat(convertedValue).toFixed(3) +
        " " +
        toList.text() +
        ")</span>"
    );
    $("#new-search-button").show();

    var nutSeq = toDataItem.Seq;
    var nutQty = convertedValue;
    if (toDataItem.Seq == 0) {
      nutSeq = fromList.value();
      nutQty = _quantityBox.val();
    }

    $.get(
      nutritionQueryUrl + "&servingsize=" + nutQty + "&seq=" + nutSeq,
      function(data) {
        var nutritionData = data;

        $(".nutrition-results").html(nutritionTemplate(nutritionData));
        /*
            "NDB_No": 18080, "Grams": 10, "ServingSize": 1, "MeasureType": "stick (7-5/8\" x 5/8\")", "Calories": 41, "TotalFat": 1, "SaturatedFat": 0, "Cholesterol": 0, "Sodium": 66, "Potassium": 12, "Carbohydrates": 7, "DietaryFiber": 0, "Sugars": 0, "Protein": 1, "TotalFatDailyPercent": 0, "SaturatedFatDailyPercent": 0, "CholesterolDailyPercent": 0, "SodiumDailyPercent": 0, "PotassiumDailyPercent": 0, "CarbohydratesDailyPercent": 0, "DietaryFiberDailyPercent": 0, "ProteinDailyPercent": 0
            */

        //Set the grams as a title on the result
        $("#result").attr(
          "title",
          "Which is also " + nutritionData.Grams.toFixed(1) + " Grams"
        );
      }
    );

    $("#results").show();
    $("#nutrition-details").show();
    $("#instructionsPanel").hide();
  }).error(function(e) {
    $("#result").html("Whoops, I encountered an error");
  });
}

function getCurrentUserID() {
  return $('[id$="currentUserHiddenField"]').val();
}

function clearDropDowns() {
  _fromCombo.dataSource.data([]);
  _toCombo.dataSource.data([]);
}

function getWeightDataItem(ndb_No, text, seqNo) {
  var dataset = _weightData;

  var returnObject = {
    NDB_No: ndb_No
  };

  if (text != "grams") {
    for (var i = 0; i < dataset.length; i++) {
      if (dataset[i].Seq == seqNo) {
        returnObject.Seq = dataset[i].Seq;
        break;
      }
    }
  } else {
    returnObject.Seq = 0; //grams;
  }

  //returnObject.FirstSeq = dataset[0].Seq;
  return returnObject;
}

function researchItem(text) {
  //cleanup
  _quantityBox.val("");
  _fromCombo.text("");
  _toCombo.text("");
  //_fromCombo.enable(false);
  //_toCombo.enable(false);
  //_enabled = false;
  //clearDropDowns();

  //add the test to the combo
  _autoCompleteCombo.close();
  _autoCompleteCombo.text(text);
  _autoCompleteCombo.search(text);
}

function rebindLastUsed() {
  var lastsearched = $("#last-searched-list").data("kendoListView");
  if (lastsearched) lastsearched.dataSource.read();
}

function isMobile() {
  if (_mobile === null) {
    _mobile = false;
    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);

    if (agentID !== null) {
      if (agentID.indexOf("iphone") >= 0) {
        _mobile = true;
      }
      if (agentID.indexOf("ipod") >= 0) {
        _mobile = true;
      }
      if (agentID.indexOf("ipad") >= 0) {
        _mobile = true;
      }
      if (agentID.indexOf("android") >= 0) {
        _mobile = true;
      }
    } else {
      _mobile = false;
    }
  }

  return _mobile;
}

/* ########## TEMPLATES ############ */
/* ############### MAIN ######################### */
var lastusedSingleTemplate = kendo.template(
  "<li id='last-used-ndb-${Ndb_No}' class='accent-dash food-item' data-ndbno='${Ndb_No}' onclick='researchItem(\"${Alias.Name}\"); return false;'><span>${Alias.Name}</span></li>"
);

var calcResultSingleTemplate = kendo.template(
  "<span id='calculated-result'>#= data #</span>"
);

var nutritionTemplate = kendo.template(
  "<table width='100%' cellspacing='0' cellpadding='0' border='0'> \
<tbody>\
    <tr>\
        <td style='padding: 3px 14px 3px 0;'>\
            <div class='left_light_label'>\
                Serving Size\
                <div class='holder' title='#= Grams.toFixed(2) # Grams'>\
                    #= ServingSize #&nbsp;#= MeasureType #\
                </div>\
            </div>\
        </td>\
    </tr>\
    <tr class='separator'>\
        <td>\
            &nbsp;\
        </td>\
    </tr>\
    <tr>\
        <td class='amount'>\
            Amount Per Serving\
        </td>\
    </tr>\
    <tr>\
        <td>\
            <div class='line'>\
                <div class='left_strong_label'>\
                    Calories\
                    <div class='holder'>\
                        #= Calories #\
                    </div>\
                </div>\
                <div class='right_light_label'>\
                    Calories from Fat\
                    <div class='holder'>\
                        #= (TotalFat * 9).toFixed(0) #\
                    </div>\
                </div>\
            </div>\
        </td>\
    </tr>\
    <tr class='thinSeparator'>\
        <td>\
            &nbsp;\
        </td>\
    </tr>\
    <tr>\
        <td>\
            <div class='small_right_strong_label'>\
                % Daily Value<sup>*</sup></div>\
        </td>\
    </tr>\
    <tr>\
        <td>\
            <div class='line'>\
                <div class='left_strong_label'>\
                    Total Fat\
                    <div class='holder'>\
                        #= TotalFat #g\
                    </div>\
                </div>\
                <div class='right_light_label'>\
                    <div class='holder_strong'>\
                        #= TotalFatDailyPercent.toFixed(0) #%\
                    </div>\
                </div>\
            </div>\
        </td>\
    </tr>\
    <tr>\
        <td class='sub'>\
            <div class='line'>\
                <div class='left_light_label'>\
                    Saturated Fat\
                    <div class='holder'>\
                        #= SaturatedFat #g\
                    </div>\
                </div>\
                <div class='right_light_label'>\
                    <div class='holder_strong'>\
                        #= SaturatedFatDailyPercent.toFixed(0) #%\
                    </div>\
                </div>\
            </div>\
        </td>\
    </tr>\
    <tr>\
        <td>\
            <div class='line'>\
                <div class='left_strong_label'>\
                    Cholesterol\
                    <div class='holder'>\
                        #= Cholesterol #mg\
                    </div>\
                </div>\
                <div class='right_light_label'>\
                    <div class='holder_strong'>\
                        #= CholesterolDailyPercent.toFixed(0) #%\
                    </div>\
                </div>\
            </div>\
        </td>\
    </tr>\
    <tr>\
        <td>\
            <div class='line'>\
                <div class='left_strong_label'>\
                    Sodium\
                    <div class='holder'>\
                        #= Sodium #mg\
                    </div>\
                </div>\
                <div class='right_light_label'>\
                    <div class='holder_strong'>\
                        #= SodiumDailyPercent.toFixed(0) #%\
                    </div>\
                </div>\
            </div>\
        </td>\
    </tr>\
    <tr>\
        <td>\
            <div class='line'>\
                <div class='left_strong_label'>\
                    Potassium\
                    <div class='holder'>\
                        #= Potassium #mg\
                    </div>\
                </div>\
                <div class='right_light_label'>\
                    <div class='holder_strong'>\
                        #= PotassiumDailyPercent.toFixed(0) #%\
                    </div>\
                </div>\
            </div>\
        </td>\
    </tr>\
    <tr>\
        <td>\
            <div class='line'>\
                <div class='left_strong_label'>\
                    Total Carbohydrate\
                    <div class='holder'>\
                        #= Carbohydrates #g\
                    </div>\
                </div>\
                <div class='right_light_label'>\
                    <div class='holder_strong'>\
                        #= CarbohydratesDailyPercent.toFixed(0) #%\
                    </div>\
                </div>\
            </div>\
        </td>\
    </tr>\
    <tr>\
        <td class='sub'>\
            <div class='line'>\
                <div class='left_light_label'>\
                    Dietary Fiber\
                    <div class='holder'>\
                        #= DietaryFiber #g\
                    </div>\
                </div>\
                <div class='right_light_label'>\
                    <div class='holder_strong'>\
                        #= DietaryFiberDailyPercent.toFixed(0) #%\
                    </div>\
                </div>\
            </div>\
        </td>\
    </tr>\
    <tr>\
        <td class='sub'>\
            <div class='line'>\
                <div class='left_light_label'>\
                    Sugars\
                    <div class='holder'>\
                        #= Sugars #g\
                    </div>\
                </div>\
            </div>\
        </td>\
    </tr>\
    <tr>\
        <td>\
            <div class='line'>\
                <div class='left_strong_label'>\
                    Protein\
                    <div class='holder'>\
                        #= Protein #g\
                    </div>\
                </div>\
                <div class='right_light_label'>\
                    <div class='holder_strong'>\
                        #= ProteinDailyPercent.toFixed(0) #%\
                    </div>\
                </div>\
            </div>\
        </td>\
    </tr>\
    <tr class='separator'>\
        <td>\
            &nbsp;\
        </td>\
    </tr>\
    <tr>\
        <td>\
            <table cellspacing='0' cellpadding='0' border='0' class='minerals'>\
                <tbody>\
                    <tr>\
                        <td class='left_col'>\
                            Vitamin A&nbsp; 0%\
                        </td>\
                        <td class='center_col'>\
                            •\
                        </td>\
                        <td class='right_col'>\
                            Vitamin C&nbsp; 0%\
                        </td>\
                    </tr>\
                    <tr>\
                        <td class='left_col'>\
                            Calcium&nbsp; 0%\
                        </td>\
                        <td class='center_col'>\
                            •\
                        </td>\
                        <td class='right_col'>\
                            Iron&nbsp; 0%\
                        </td>\
                    </tr>\
                </tbody>\
            </table>\
        </td>\
    </tr>\
    <tr>\
        <td>\
            <div class='line'>\
                <div class='small_left_light_label'>\
                    * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may\
                    be higher or lower depending on your calorie needs.\
                </div>\
                <div class='usdanumber'>\
                    Usda Food Number: #= NDB_No #\
                </div>\
            </div>\
        </td>\
    </tr>\
</tbody>\
</table>"
);
