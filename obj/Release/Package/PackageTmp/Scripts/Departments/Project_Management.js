if (typeof (LOS) == "undefined")
{
    var LOS = {};
}
if (typeof (LOS.Departments) == "undefined")
{
    LOS.Departments = {};
}




LOS.Departments.Project_Management = (function () {
    var _config;

    return ({

        init: function (config) {
            _config = config;
            $("#new-project-mangmnt-scenario").click(function () {
                $("#project-mangmnt-modal").modal("show");
            });

            $("#cal-project-mngmnt-fte").click(function () {
                var skill = $("#pm-skills option:selected").val();
                var expertise = $("#pm-expertise").val();
                var duration = $("#pm-duration").val();
                var visibility = $("#pm-visibility").val();

                $.ajax({
                    url: _config.getFTEsUrl,
                    dataType: 'json',
                    type: 'GET',
                    data: {
                        skill:skill,
                        expertise:expertise,
                        duration:duration,
                        visibility:visibility
                    },
                    success: function (response) {                       
                        $("#pm-director").val(response.Director);
                        $("#pm-supervisor").val(response.Supervisor);
                        $("#pm-associate-director").val(response.Associate_Director);
                        $("#pm-associate").val(response.Associate);
                        $("#pm-service-level").val(response.Service_Level);

                        var total = parseFloat($("#pm-director").val()) + parseFloat($("#pm-supervisor").val()) + parseFloat($("#pm-associate-director").val()) + parseFloat($("#pm-associate").val());
                        alert(total);
                        $("#pm-total").val(total);
                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }

                });
                alert(skill);

            });
        }

    });
})();