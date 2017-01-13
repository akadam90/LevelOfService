if (typeof (LOS) == "undefined") {
    var LOS = {};
}

if (typeof (LOS.Departments) == "undefined") {
    LOS.Departments = {};
}


LOS.Departments.Bill_Pay_Traffic = (function () {
    var _config;
    var departmentName = "Bill Pay/Traffic";

    return {

        init: function (config) {
            _config = config;

            $("#new-bill-pay-scenario").click(function () {
                LOS.Departments.Bill_Pay_Traffic.new_Bill_Pay_Traffic();
            });

            $("select[id$='-spending']").change(function () {
                var x = this.id.split("-");
                var dept=x[1];
                
                var d = $("#input-"+dept+"-spending option:selected").val();
                $.ajax({
                    url: _config.getFTEsUrl,
                    dataType: 'json',
                    type: 'GET',
                    data: {
                        id: d,
                    },
                    success: function (response) {                        
                        $("#" + dept + "-service").val(response.Service_Level);
                        $("#"+dept+"-director").val(parseFloat(response.Director));
                        $("#"+dept+"-lead-liaison").val(parseFloat(response.Lead_Liaison));
                        $("#"+dept+"-associate-director").val(parseFloat(response.Associate_Director));
                        $("#" + dept + "-liaison").val(parseFloat(response.Liaison));
                        var total =parseFloat($("#" + dept + "-director").val()) +parseFloat($("#" + dept + "-lead-liaison").val()) + parseFloat($("#" + dept + "-associate-director").val()) +parseFloat($("#" + dept + "-liaison").val());
                        $("#" + dept + "-total").val(total);
                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }
                });

            });                  

            $("#bill-pay-traffic-form").submit(function(event){
                event.preventDefault();
                var data = {
                    digitalId: parseInt($("#input-digital-spending").val()),
                    nationalId: parseInt($("#input-national-spending").val()),
                    oohId: parseInt($("#input-ooh-spending").val()),
                    printId : parseInt($("#input-print-spending").val()),
                    broadcastId: parseInt($("#input-broadcast-spending").val()),
                    oohTrafficId : parseInt($("#input-oohtraffic-spending").val()),
                    businessId: parseInt($("#billpay-business-id").val()),
                    scenarioId: parseInt($("#billpay-scenario-id").val())
                }
               
                var scenarioInputs = JSON.stringify(data);
                
                //if (LOS.Departments.Bill_Pay_Traffic.validateForm(this)) {      //Validation
                $.ajax({
                    url: $(this).attr('action'),
                    type: 'POST',
                    data: scenarioInputs,
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (response) {
                        $("#message-modal").modal('show');
                        $("#message-modal .modal-body p").remove();

                        if (response == true) {
                            $("#bill-pay-traffic-modal").modal("hide");
                            $("#message-modal .modal-body").append("<p>Scenario Saved Successfully</p>");
                            $("#billpay-scenarios-dataTable").DataTable().ajax.reload();

                        }
                        else {
                            $("#message-modal .modal-body").append("<p>Saving Scenario encountered some issue</p>");
                        }
                    },
                    error: function (xhr, status, error) {
                        $("#message-modal").modal('show');
                        $("#message-modal .modal-body p").remove();
                        $("#message-modal .modal-body").append("<p>" + error + "</p>");
                    }
                });
                // }
            });            

            $("#delete-scenario-form").submit(function (event) {
                event.preventDefault();
                var id = $("#delete-scenario-id").val();

                $.ajax({
                    url: _config.deleteScenario,                    
                    type: 'GET',
                    dataType:'json',
                    data: {
                        scenarioId: id
                    },
                    success: function (response) {
                        $("#message-modal").modal('show');
                        $("#message-modal .modal-body p").remove();

                        if (response == true) {
                            $("#delete-scenario-modal").modal("hide");
                            $("#message-modal .modal-body").append("<p>Scenario Deleted Successfully</p>");
                            $("#billpay-scenarios-dataTable").DataTable().ajax.reload();
                        }
                        else {
                            $("#delete-scenario-modal").modal("hide");
                            $("#message-modal .modal-body").append("<p>Deleting Scenario Encountered some problem</p>");
                        }
                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }
                });
            });

            $("#final-scenario-form").submit(function (event) {
                event.preventDefault();
                var scenarioId = $("#final-scenario-id").val();
                var businessId = $("#final-business-id").val();
          
                $.ajax({
                    url: _config.markFinal,
                    type: 'GET',
                    dataType:'json',
                    data: {
                        scenarioId: scenarioId,
                        businessId: businessId
                    },
                    success: function (response) {
                        $("#message-modal").modal('show');
                        $("#message-modal .modal-body p").remove();
                        if (response == true) {
                            $("#final-scenario-modal").modal("hide");
                            $("#message-modal .modal-body").append("<p>Scenario Marked Final</p>");
                            $("#billpay-scenarios-dataTable").DataTable().ajax.reload();
                        }
                        else {
                            $("#final-scenario-modal").modal("hide");
                            $("#message-modal .modal-body").append("<p>Encountered some problem</p>");
                        }
               },
                    error: function (xhr, status, error) {
                        alert(error);
               }
          });
            });

            $('#billpayTabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                if (e.target.id == "billpay-scenarios-tab") {

                }
                else if (e.target.id == "billpay-survey-tab") {

                }
                else if (e.target.id == "billpay-submitted-tab") {

                }
            });


            /*DataTable initialized for page loading*/
            $("#billpay-scenarios-dataTable").DataTable({
                bPaginate: false,
                bLengthChange: false,
                bFilter: true,
                bInfo: false,
                bAutoWidth: false,
                language: {
                    "emptyTable": "Select Client to view Business Scenarios"
                },
                columns: [
                 {
                     data: '',                     
                 },
                 {
                     data: 'Name',                    
                 },
                ],                
            });
            
            /*When Client is changed*/
            $("#input-client").change(function () {
                var client = $("#input-client option:selected").val();

                /*DataTable cleared and re-initialized on different client selection (Based on Client Dropdown )*/
                if ($.fn.DataTable.isDataTable("#billpay-scenarios-dataTable")) {
                    $('#billpay-scenarios-dataTable').DataTable().clear().destroy();
                }              

                $("#billpay-scenarios-dataTable").DataTable({
                    bPaginate: false,
                    bLengthChange: false,
                    bFilter: true,
                    bInfo: false,
                    bAutoWidth: false,
                    language: {
                        "emptyTable": "Select Business to view its associated Scenarios"
                    },
                    columns: [
                     {
                         data: '',
                     },
                     {
                         data: 'Name',
                     },
                    ],
                });

                /*Get all Businesses for this client*/
                $.ajax({
                    url: _config.getBusinesses,
                    dataType: 'json',
                    type: 'GET',
                    data: {
                        clientId: client,
                    },
                    success: function (response) {
                        var data = response;                        
                        $('#business-select').find('option:not(:first)').remove();                        
                        for (var i = 0; i < data.length; i++)
                        {                                                          
                            $("#business-select").append('<option id="business-select-option-' + data[i].BusinessId + '" value="' + data[i].BusinessId + '">' + data[i].BusinessName + '</option>');
                        }                        
                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }
                });

            });          

            /*When Business changes*/
            $('#business-select').change(function () {
                var businessId = $('#business-select option:selected').val();                

                /*DataTable cleared, re-initialized and filled with Scenarios belonging to this business*/

                if ($.fn.DataTable.isDataTable("#billpay-scenarios-dataTable")) {
                    $('#billpay-scenarios-dataTable').DataTable().clear().destroy();
                }

                $("#billpay-scenarios-dataTable").DataTable({
                    bPaginate: false,
                    bLengthChange: false,
                    bFilter: true,
                    bInfo: false,
                    bAutoWidth: false,
                    ajax: {
                        url: _config.getAllScenarios,
                        type: "GET",
                        data: {
                            //department: departmentName,
                            businessId: businessId
                        },
                        dataSrc: function (responseData) {
                            return responseData;
                        },
                    },
                    language: {
                        "emptyTable": "No Scenario created for this Business"
                    },
                    columns: [
                     {
                         data: '',
                         render: function (data, type, row) {
                             return '<div class="dropdown"><a class="billpay-option-links" id="billpay-option-link-"' + row.Id + ' data-toggle="dropdown"> <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span></a> <ul class="dropdown-menu" aria-labelledby="dLabel"><li><a class="edit-billpay-links" id="edit-billpay-link-' + row.Id + '">Edit Scenario</a></li><li><a class="delete-billpay-links" id="delete-billpay-link-' + row.Id + '">Delete Scenario</a></li><li><a class="final-billpay-links" id="final-billpay-link-' + row.Id + '">Mark Final</a></li><li><a class="download-billpay-links" id="download-billpay-link-' + row.Id + '">Download Scenario</a></li></ul></div>';
                         }
                     },
                     {
                         data: 'Name',
                         render: function (data, type, row) {
                             if (row.IsFinal == false) {
                                 return '<a href="javascript:void(0)" class="billpay-scenario-link" id=billpay-scenario-link-' + row.Id + '>' + row.Name + '</a>';
                             }
                             else {
                                 return '<a href="javascript:void(0)" class="billpay-scenario-link" id=billpay-scenario-link-' + row.Id + '>' + row.Name + '</a> <a class="surveyLinks" id="fill-survey-' + row.BusinessId + '"><i>Final</i></a>';
                             }
                         }
                     },
                    ],

                    drawCallback: function (settings) {
                        $('#billpay-scenarios-dataTable .billpay-scenario-link').unbind('click');
                        $('#billpay-scenarios-dataTable .billpay-scenario-link').click(function () {
                            var scenarioId = $(this).attr('id').replace('billpay-scenario-link-', '');                            
                            LOS.Departments.Bill_Pay_Traffic.edit_Bill_Pay_Scenario(scenarioId);                                                       
                        });

                        $("#billpay-scenarios-dataTable .billpay-option-links").unbind('click');
                        $("#billpay-scenarios-dataTable .billpay-option-links").click(function () {
                            var id = $(this).attr('id').replace('billpay-option-link-', '');                            
                        });

                        $("#billpay-scenarios-dataTable .edit-billpay-links").unbind('click');
                        $("#billpay-scenarios-dataTable .edit-billpay-links").click(function () {
                            var id = $(this).attr('id').replace("edit-billpay-link-", "");
                            LOS.Departments.Bill_Pay_Traffic.edit_Bill_Pay_Scenario(id);
                        });

                        $("#billpay-scenarios-dataTable .delete-billpay-links").unbind('click');
                        $("#billpay-scenarios-dataTable .delete-billpay-links").click(function () {
                            var id = $(this).attr('id').replace("delete-billpay-link-", "");
                            LOS.Departments.Bill_Pay_Traffic.delete_Bill_Pay_Scenario(id);
                        });

                        $("#billpay-scenarios-dataTable .final-billpay-links").unbind('click');
                        $("#billpay-scenarios-dataTable .final-billpay-links").click(function () {
                            var id = $(this).attr('id').replace("final-billpay-link-", "");
                            var businessId = $('#business-select option:selected').val();
                            LOS.Departments.Bill_Pay_Traffic.mark_Final_Bill_Pay_Sceanrio(id,businessId);
                        });


                        $("#billpay-scenarios-dataTable .download-billpay-links").unbind('click');
                        $("#billpay-scenarios-dataTable .download-billpay-links").click(function () {
                            var id = $(this).attr('id').replace("download-billpay-link-", "");                            
                            LOS.Departments.Bill_Pay_Traffic.download_Bill_Pay_Scenario(id);
                        });

                    }
                });
            });
        },

        

        new_Bill_Pay_Traffic: function () {
            var businessId = parseInt($('#business-select option:selected').val());
            if(businessId==0)
            {
                $("#message-modal").modal('show');
                $("#message-modal .modal-body p").remove();                
                $("#message-modal .modal-body").append("<p>Select Business to add new Scenario</p>");
            }
            else
            {
                $("#bill-pay-traffic-modal").modal("show");
                $("#bill-pay-traffic-form")[0].reset();                
                $("#billpay-scenario-id").val(0);
                $("#billpay-business-id").val(businessId);
            }            
            
        },

        edit_Bill_Pay_Scenario: function (scenarioId) {
            var businessId = parseInt($('#business-select option:selected').val());

            $.ajax({
                url: _config.getScenario,
                dataType: 'json',
                type: 'GET',
                data: {
                    scenarioId: scenarioId,
                },
                success: function (response) {
                    var data = response;

                    $("#bill-pay-traffic-modal").modal('show');
                    $("#bill-pay-traffic-form")[0].reset();
                    $("#billpay-business-id").val(businessId);
                    $("#billpay-scenario-id").val(scenarioId);

                    for (var i = 0; i < data.length; i++)
                    {                        
                        if (data[i].SpendingType == "OOH_Traffic")
                        {
                            var dept = "oohtraffic";                            
                        }
                        else
                        {
                            var dept = data[i].SpendingType.toLowerCase().split("_")[0];                     
                        }

                        $("#input-" + dept + "-spending").val(data[i].Id);
                        $("#" + dept + "-director").val(data[i].Director);
                        $("#" + dept + "-lead-liaison").val(data[i].Lead_Liaison);
                        $("#" + dept + "-associate-director").val(data[i].Associate_Director);
                        $("#" + dept + "-liaison").val(data[i].Liaison);
                        $("#" + dept + "-service").val(data[i].Level);
                        var total = parseFloat($("#" + dept + "-director").val()) + parseFloat($("#" + dept + "-lead-liaison").val()) + parseFloat($("#" + dept + "-associate-director").val()) + parseFloat($("#" + dept + "-liaison").val());
                        $("#" + dept + "-total").val(total);                        
                    }
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });

        },

        delete_Bill_Pay_Scenario: function (id) {           
            $("#delete-scenario-modal").modal('show');
            $("#delete-scenario-id").val(id);
            $("#delete-department-id").val(1); //Id for Bill/Pay department is 1            
        },
        
        mark_Final_Bill_Pay_Sceanrio : function(id,businessId){            
            $("#final-scenario-modal").modal('show');           
            $("#final-scenario-id").val(id);
            $("#final-business-id").val(businessId);
        },

        download_Bill_Pay_Scenario: function (id) {            
            $("#download-scenario-modal").modal('show');
            $("#download-scenario-id").val(id);
        },

        validateForm: function (form) {
            $("#bill-pay-traffic-form span.errorItems").html("");
            if ($("#input-digital-spending").val()==null)
            {
            
            }
        }




    }
})();

