if (typeof (LOS) == "undefined") {
    var LOS = {};
}

if (typeof (LOS.Departments) == "undefined") {
    LOS.Departments = {};
}


LOS.Departments.Platform_Operations_Local = (function () {
    return {

        init: function () {
            $("#new-local-scenario").click(function () {
                LOS.Departments.Platform_Operations_Local.new_Local();
            });

            $("#cal-local-btn").click(function(){
                LOS.Departments.Platform_Operations_Local.calculate_Local_FTEs();
            });

        },

        new_Local: function () {
            $("#local-modal").modal("show");
        },

    calculate_Local_FTEs:function(){
        if ($("#input-local-billings").val() == "")
            alert("Please enter input for Gross Billings");
        else
        {            
            var input = parseInt($("#input-local-billings").val());
            var localFTE = parseFloat(input / 16666666);

            var local_director = parseFloat(localFTE * $("#local-director-muliplier").val()).toFixed(2);
            $("#platform-local-director").val(local_director);

            var local_associate_director = parseFloat(localFTE * $("#local-associate-director-mulitiplier").val()).toFixed(2);
            $("#platform-local-associate-director").val(local_associate_director);

            var local_associate = parseFloat(localFTE * $("#local-associate-mulitiplier").val()).toFixed(2);
            $("#platform-local-associate").val(local_associate);

            var local_supervisor = parseFloat(localFTE * $("#local-spervisor-mulitiplier").val()).toFixed(2);
            $("#platform-local-supervisor").val(local_supervisor);
            
            $("#platform-local-total").val(parseFloat ( parseFloat(local_supervisor) + parseFloat(local_associate) + parseFloat(local_director) + parseFloat(local_associate_director) ).toFixed(2));                
        }
    }
    }
})();

