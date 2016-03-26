var dialogsModule = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");
var socialShare = require("nativescript-social-share");
var swipeToJudge = require("../../shared/utils/ios-swipe-judge");
var page;

var scoreList = new GroceryListViewModel([]);
var pageData = new Observable({
    projectList: projectList,
    project: ""
});

exports.loaded = function(args) {
    page = args.object;
    var listView = page.getViewById("projectList");

    if (page.ios) {
        swipeToJudge.enable(listView, function(index) {
            projectList.judge(index);
        });
    }
    
    page.bindingContext = pageData;

    pageData.set("isLoading", true);
    projectList.load().then(function() {
        pageData.set("isLoading", false);
        listView.animate({
            opacity: 1,
            duration: 1000
        });
    });
};


exports.sync = function () {
  var list = [];
  var finalList = "";
  for (var i = 0, size = scoreList.length; i < size ; i++) {
    list.push(scoreList.getItem(i).name);
  }
  var listString = list.join(", ").trim();
  socialShare.shareText(listString);
};

exports.judge = function(args) {
    var item = args.view.bindingContext;
    var index = projectLiset.indexOf(item);
    projectList.judge(index);
};