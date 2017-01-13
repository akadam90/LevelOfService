if (typeof (LOS) == "undefined") {
    var LOS = {};
}

if (typeof (LOS.Departments) == "undefined") {
    LOS.Departments = {};
}

LOS.Departments.Platform_Operations_Publishing = (function () {
    return {
        init: function (config) {
            $("#new-publishing-scenario").click(function () {
                LOS.Departments.Platform_Operations_Publishing.new_Publishing();
            });

            $("#cal-publishing-btn").click(function () {
                LOS.Departments.Platform_Operations_Publishing.calculate_Publishing_FTEs();
            });

        },
        new_Publishing: function () {
            $("#publishing-modal").modal("show");
        },

        calculate_Publishing_FTEs: function () {
            if ($("#input-publishing-billings").val() == "")
                alert("Please enter input for NET Billings");
            else {
                var input = parseInt($("#input-publishing-billings").val());

                var publishing_director = (parseFloat(input * $("#publishing-director-muliplier").val()) / 1000000).toFixed(2);
                $("#platform-publishing-director").val(publishing_director);
                alert(publishing_director);

                var publishing_associate_director = (parseFloat(input * $("#publishing-associate-director-mulitiplier").val()) / 1000000).toFixed(2);
                $("#platform-publishing-associate-director").val(publishing_associate_director);

                var publishing_associate = (parseFloat(input * $("#publishing-associate-mulitiplier").val()) / 1000000).toFixed(2);
                $("#platform-publishing-associate").val(publishing_associate);

                var publishing_supervisor = (parseFloat(input * $("#publishing-spervisor-mulitiplier").val()) / 1000000).toFixed(2);
                $("#platform-publishing-supervisor").val(publishing_supervisor);

                $("#platform-publishing-total").val(parseFloat(parseFloat(publishing_supervisor) + parseFloat(publishing_associate) + parseFloat(publishing_director) + parseFloat(publishing_associate_director)).toFixed(2));
            }

        }
    }

})();
