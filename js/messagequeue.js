// FPP10 plugin self-update: ask the host whether this plugin has git updates
// and, if so, offer an "Update Now" button that streams the upgrade through
// FPP's plugin API (api/plugin/<repo>/upgrade). Replaces the old POST to the
// removed /opt/fpp/scripts/update_plugin helper.

$(document).ready(async () => {
  await checkPluginUpdates();
});

async function checkPluginUpdates() {
  await $.ajax({
    url: "/api/plugin/FPP-Plugin-MessageQueue/updates",
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    success: (data) => {
      if (data && data.updatesAvailable === 1) {
        $("#updatesAvailable").html(
          '<h4 style="color:red;">A Plugin Update is Available</h4>' +
          '<button class="buttons btn-success" onclick="UpgradePlugin(&quot;FPP-Plugin-MessageQueue&quot;)">' +
          '<i class="far fa-arrow-alt-circle-down"></i> Update Now</button>'
        );
      }
    },
  });
}

function UpgradePlugin(plugin) {
  var url = "api/plugin/" + plugin + "/upgrade?stream=true";
  DisplayProgressDialog("pluginsProgressPopup", "Upgrade Plugin");
  StreamURL(url, "pluginsProgressPopupText", "PluginProgressDialogDone", "PluginProgressDialogDone");
}

function PluginProgressDialogDone() {
  $("#pluginsProgressPopupCloseButton").prop("disabled", false);
  EnableModalDialogCloseButton("pluginsProgressPopup");
}
