if (typeof (LOS) == "undefined") {
    var LOS = {};
}

if (typeof (LOS.Home) == "undefined") {
    LOS.Home = {};
}


LOS.Home.Department_Lead = (function () {

    return {
        
        init: function () {

            $("#new-bill-pay-scenario").click(function () {
                $("#bill-pay-traffic-modal").modal("show");
            });

        }
        }
})();

