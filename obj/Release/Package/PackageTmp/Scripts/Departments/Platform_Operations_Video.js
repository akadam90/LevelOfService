if (typeof (LOS) == "undefined") {
    var LOS = {};
}

if (typeof (LOS.Departments) == "undefined") {
    LOS.Departments = {};
}


LOS.Departments.Platform_Operations_Video = (function () {
    var _config;

    return {

        init: function (config) {
            _config = config;

            $("#new-video-scenario").click(function () {
                LOS.Departments.Platform_Operations_Video.new_Video();
            });

            $("#input-video-billings").change(function () {
                var d = $("#input-video-billings option:selected").val();

                $.ajax({
                    url: _config.getFTEsUrl,
                    dataType: 'json',
                    type: 'GET',
                    data: {
                        id: d,
                    },
                    success: function (response) {
                        $("#platform-video-director").val(parseFloat(response.Director));
                        $("#platform-video-supervisor").val(parseFloat(response.Supervisor));
                        $("#platform-video-associate-director").val(parseFloat(response.Associate_Director));
                        $("#platform-video-associate").val(parseFloat(response.Associate));
                        var total = parseFloat($("#platform-video-director").val()) + parseFloat($("#platform-video-supervisor").val()) + parseFloat($("#platform-video-associate-director").val()) + parseFloat($("#platform-video-associate").val());
                        $("#platform-video-total").val(total);
                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }
                });
            });

        },

        new_Video: function () {
            $("#video-modal").modal("show");
        },


    }
})();

