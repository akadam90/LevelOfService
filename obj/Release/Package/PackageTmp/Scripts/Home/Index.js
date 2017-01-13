if (typeof (LOS) == "undefined") {
    var LOS = {};
}

if (typeof (LOS.Home) == "undefined") {
    LOS.Home = {};
}

LOS.Home.Index = (function () {

    return {
        init: function () { 
           
            
            //$("#new-taag-estimate-scenario").click(function () {
            //    $("#tag-estimate-modal").modal("show");
            //});           

            $("#input-client").change(function () {
                var d = $("#input-client option:selected").val();
                $("#client-selected").val(d);
                
            });

            }
        }
    
})();