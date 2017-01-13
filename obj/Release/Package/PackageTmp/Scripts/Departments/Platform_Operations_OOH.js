if (typeof (LOS) == "undefined") {
    var LOS = {};
}

if (typeof (LOS.Departments) == "undefined") {
    LOS.Departments = {};
}

LOS.Departments.Platform_Operations_OOH = (function () {
     return {
        init: function (config) {
            $("#new-ooh-scenario").click(function () {
                LOS.Departments.Platform_Operations_OOH.new_OOH();
            });

            $("#cal-ooh-btn").click(function () {
                LOS.Departments.Platform_Operations_OOH.calculate_OOH_FTEs();
            });
            
        },
        new_OOH : function(){
            $("#ooh-modal").modal("show");
        },

        calculate_OOH_FTEs: function ()
        {
            if ($("#input-ooh-billings").val() == "")
                alert("Please enter input for NET Billings");
            else {
                var input = parseInt($("#input-ooh-billings").val());                

                var ooh_director = (parseFloat(input * $("#ooh-director-muliplier").val()) / 1000000).toFixed(2);
                $("#platform-ooh-director").val(ooh_director);
                alert(ooh_director);

                var ooh_associate_director = (parseFloat(input * $("#ooh-associate-director-mulitiplier").val())/1000000).toFixed(2);
                $("#platform-ooh-associate-director").val(ooh_associate_director);

                var ooh_associate = (parseFloat(input * $("#ooh-associate-mulitiplier").val())/1000000).toFixed(2);
                $("#platform-ooh-associate").val(ooh_associate);

                var ooh_supervisor = (parseFloat(input * $("#ooh-spervisor-mulitiplier").val()) / 1000000).toFixed(2);
                $("#platform-ooh-supervisor").val(ooh_supervisor);

                $("#platform-ooh-total").val(parseFloat(parseFloat(ooh_supervisor) + parseFloat(ooh_associate) + parseFloat(ooh_director) + parseFloat(ooh_associate_director)).toFixed(2));
            }

        }
    }

})();