define('plugin/jenkins/pr-triggerbutton', [
  'jquery',
  'aui',
  'model/page-state'
], function($, AJS, pageState) {

  var resourceUrl = AJS.contextPath() + '/rest/jenkins/latest/projects/' 
    + pageState.getProject().key + '/repos/' 
    + pageState.getRepository().slug + '/triggerJenkins';

  var waiting = '<span class="aui-icon aui-icon-wait">Wait</span>';
  
  $(".triggerJenkinsBuild").click(function() {
    var $this = $(this);
    var text = $this.text();

    $this.attr("disabled", "disabled").html(waiting + " " + text);
  
    $.post(resourceUrl, function() {
      // Place in timer for UI-happiness - might go "too quick" and not notice
      // it actually triggered
      setTimeout(function() {  
          $this.removeAttr("disabled").text(text);
      }, 500);
    });
    return false;
  });

});

AJS.$(document).ready(function() {
    require('plugin/jenkins/pr-triggerbutton');
});