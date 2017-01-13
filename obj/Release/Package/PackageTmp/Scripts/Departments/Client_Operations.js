if (typeof (LOS) == "undefined") {
    var LOS = {};
}

if (typeof (LOS.Departments) == "undefined") {
    LOS.Departments = {};
}


LOS.Departments.Client_Operations = (function () {
    var _config;

    return {

        init: function (config) {
            _config = config;

            $("#new-client-operations-scenario").click(function () {
                LOS.Departments.Client_Operations.new_Client_Operations();
            });


            $("#input-clients-ops-service-level").change(function () {
                var d = $("#input-clients-ops-service-level option:selected").val();

                $.ajax({
                    url: _config.getFTEsUrl,
                    dataType: 'json',
                    type: 'GET',
                    data: {
                        id: d,
                    },
                    success: function (response) {                       
                        $("#Draft_Billing").val(response.Draft_Billing);
                        $("#Customized_RACI").val(response.Customized_RACI);
                        $("#Budget_Reporting").val(response.Budget_Reporting);
                        $("#Media_Landscape_Support").val(response.Media_Landscape_Support);
                        $("#Basic_Competitive").val(response.Basic_Competitive);
                        $("#Additional_Competitive").val(response.Additional_Competitive);
                        $("#Audit_Requests").val(response.Audit_Requests);
                        $("#Additional_Templatized_Reporting").val(response.Additional_Templatized_Reporting);
                        $("#Authorizations").val(response.Authorizations);
                        $("#Modeling_Data_Pulls").val(response.Modeling_Data_Pulls);
                        $("#Systems_Administration").val(response.Systems_Administration);
                        $("#TOPS_In_House_Consultancy").val(response.TOPS_In_House_Consultancy);
                        $("#Basic_Data_Pulls").val(response.Basic_Data_Pulls);
                        $("#PL_Support").val(response.PL_Support);
                        $("#Onboarding").val(response.Onboarding);
                        $("#Mgmt_Of_Cross_Practice_Tasks").val(response.Mgmt_Of_Cross_Practice_Tasks);
                        $("#Finance_Support").val(response.Finance_Support);
                        $("#Dashboards").val(response.Dashboards);
                        $("#Brands_And_Clients").val(response.Brands_And_Clients);
                        $("#Customized_Reporting").val(response.Customized_Reporting);
                        $("#Global_Support").val(response.Global_Support);
                        $("#Director").val(response.Director);
                        $("#Supervisor").val(response.Supervisor);
                        $("#Associate_Director").val(response.Associate_Director);
                        $("#Associate").val(response.Associate);

                        var total = parseFloat($("#Director").val()) + parseFloat($("#Supervisor").val()) + parseFloat($("#Associate_Director").val()) + parseFloat($("#Associate").val());                      
                        $("#client-operations-total").val(total);
                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }
                });
            });

            $('#clientOperationsTabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                if (e.target.id == "client-operations-scenarios-tab") {

                }
                else if (e.target.id == "client-operations-survey-tab") {

                }
                else if (e.target.id == "client-operations-submitted-tab") {

                }
            });

            /*DataTable initialized for page loading*/
            $("#client-operations-scenarios-dataTable").DataTable({
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
                if ($.fn.DataTable.isDataTable("#client-operations-scenarios-dataTable")) {
                    $('#client-operations-scenarios-dataTable').DataTable().clear().destroy();
                }

                $("#client-operations-scenarios-dataTable").DataTable({
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
                        for (var i = 0; i < data.length; i++) {
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

                if ($.fn.DataTable.isDataTable("#client-operations-scenarios-dataTable")) {
                    $('#client-operations-scenarios-dataTable').DataTable().clear().destroy();
                }

                $("#client-operations-scenarios-dataTable").DataTable({
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
                             return '<div class="dropdown"><a class="client-operations-option-links" id="client-operations-option-link-"' + row.Id + ' data-toggle="dropdown"> <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span></a> <ul class="dropdown-menu" aria-labelledby="dLabel"><li><a class="edit-client-operations-links" id="edit-client-operations-link-' + row.Id + '">Edit Scenario</a></li><li><a class="delete-client-operations-links" id="delete-client-operations-link-' + row.Id + '">Delete Scenario</a></li><li><a class="final-client-operations-links" id="final-client-operations-link-' + row.Id + '">Mark Final</a></li><li><a class="download-client-operations-links" id="download-client-operations-link-' + row.Id + '">Download Scenario</a></li></ul></div>';
                         }
                     },
                     {
                         data: 'Name',
                         render: function (data, type, row) {
                             if (row.IsFinal == false) {
                                 return '<a href="javascript:void(0)" class="client-operations-scenario-link" id=client-operations-scenario-link-' + row.Id + '>' + row.Name + '</a>';
                             }
                             else {
                                 return '<a href="javascript:void(0)" class="client-operations-scenario-link" id=client-operations-scenario-link-' + row.Id + '>' + row.Name + '</a> <a class="surveyLinks" id="fill-survey-' + row.BusinessId + '"><i>Final</i></a>';
                             }
                         }
                     },
                    ],

                    drawCallback: function (settings) {
                        $('#client-operations-scenarios-dataTable .client-operations-scenario-link').unbind('click');
                        $('#client-operations-scenarios-dataTable .client-operations-scenario-link').click(function () {
                            var scenarioId = $(this).attr('id').replace('client-operations-scenario-link-', '');
                            LOS.Departments.Client_Operations.edit_Client_Operations(scenarioId);
                        });

                        $("#client-operations-scenarios-dataTable .client-operations-option-links").unbind('click');
                        $("#client-operations-scenarios-dataTable .client-operations-option-links").click(function () {
                            var id = $(this).attr('id').replace('client-operations-option-link-', '');
                        });

                        $("#client-operations-scenarios-dataTable .edit-client-operations-links").unbind('click');
                        $("#client-operations-scenarios-dataTable .edit-client-operations-links").click(function () {
                            var scenarioId = $(this).attr('id').replace("edit-client-operations-link-", "");                           
                            LOS.Departments.Client_Operations.edit_Client_Operations(scenarioId);
                        });

                        $("#client-operations-scenarios-dataTable .delete-client-operations-links").unbind('click');
                        $("#client-operations-scenarios-dataTable .delete-client-operations-links").click(function () {
                            var scenarioId = $(this).attr('id').replace("delete-client-operations-link-", "");
                            LOS.Departments.Client_Operations.delete_Client_Scenario(scenarioId);
                        });

                        $("#client-operations-scenarios-dataTable .final-client-operations-links").unbind('click');
                        $("#client-operations-scenarios-dataTable .final-client-operations-links").click(function () {
                            var scenarioId = $(this).attr('id').replace("final-client-operations-link-", "");
                            var businessId = $('#business-select option:selected').val();
                            LOS.Departments.Client_Operations.markFinal_Client_Scenario(scenarioId,businessId);
                        });


                        $("#client-operations-scenarios-dataTable .download-client-operations-links").unbind('click');
                        $("#client-operations-scenarios-dataTable .download-client-operations-links").click(function () {
                            var scenarioId = $(this).attr('id').replace("download-client-operations-link-", "");
                            LOS.Departments.Client_Operations.download_Client_Scenario(scenarioId);
                        });

                    }
                });
            });
           

            $("#client-operations-form").submit(function (event) {
                event.preventDefault();               
                var clientOpsInput = $("#input-clients-ops-service-level option:selected").val();
                var businessId = $("#client-business-id").val();
                var scenarioId = $("#client-scenario-id").val();

                if (clientOpsInput == 0) {
                    $("#message-modal").modal('show');
                    $("#message-modal .modal-body p").remove();
                    $("#message-modal .modal-body").append("<p>Please select Service Level</p>");
                }
                else {
                    $.ajax({
                        url: _config.saveClientScenario,
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            scenarioId: scenarioId,
                            businessId: businessId,
                            clientOpsId: clientOpsInput,
                        },
                        success: function (response) {
                            $("#message-modal").modal('show');
                            $("#message-modal .modal-body p").remove();

                            if (response == true) {
                                $("#client-operations-modal").modal("hide");
                                $("#message-modal .modal-body").append("<p>Scenario Saved Successfully</p>");
                                $("#client-operations-scenarios-dataTable").DataTable().ajax.reload();

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
                }
            });

            $("#delete-scenario-form").submit(function (event) {
                event.preventDefault();
                var id = $("#delete-scenario-id").val();

                $.ajax({
                    url: _config.deleteScenario,
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        scenarioId: id
                    },
                    success: function (response) {
                        $("#message-modal").modal('show');
                        $("#message-modal .modal-body p").remove();

                        if (response == true) {
                            $("#delete-scenario-modal").modal("hide");
                            $("#message-modal .modal-body").append("<p>Scenario Deleted Successfully</p>");
                            $("#client-operations-scenarios-dataTable").DataTable().ajax.reload();
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
                    dataType: 'json',
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
                            $("#client-operations-scenarios-dataTable").DataTable().ajax.reload();
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
        },        

        new_Client_Operations: function () {
            var businessId = parseInt($('#business-select option:selected').val());            
            if (businessId == 0) {               
                $("#message-modal").modal('show');
                $("#message-modal .modal-body p").remove();
                $("#message-modal .modal-body").append("<p>Select Business to add new Scenario</p>");
            }
            else {                
                $("#client-operations-modal").modal("show");
                $("#client-operations-form")[0].reset();
                $("#client-scenario-id").val(0);
                $("#client-business-id").val(businessId);
            }
        },

        edit_Client_Operations: function (scenarioId) {
            var businessId = parseInt($('#business-select option:selected').val());
            $("#client-scenario-id").val(scenarioId);
            $("#client-business-id").val(businessId);

            $.ajax({
                url: _config.getScenario,
                dataType: 'json',
                type: 'GET',
                data: {
                    scenarioId: scenarioId,
                },
                success: function (response) {                    

                    $("#client-operations-modal").modal('show');
                    $("#client-operations-form")[0].reset();

                    $("#input-clients-ops-service-level").val(response.Service_Level_Id);

                    $("#Draft_Billing").val(response.Draft_Billing);
                    $("#Customized_RACI").val(response.Customized_RACI);
                    $("#Budget_Reporting").val(response.Budget_Reporting);
                    $("#Media_Landscape_Support").val(response.Media_Landscape_Support);
                    $("#Basic_Competitive").val(response.Basic_Competitive);
                    $("#Additional_Competitive").val(response.Additional_Competitive);
                    $("#Audit_Requests").val(response.Audit_Requests);
                    $("#Additional_Templatized_Reporting").val(response.Additional_Templatized_Reporting);
                    $("#Authorizations").val(response.Authorizations);
                    $("#Modeling_Data_Pulls").val(response.Modeling_Data_Pulls);
                    $("#Systems_Administration").val(response.Systems_Administration);
                    $("#TOPS_In_House_Consultancy").val(response.TOPS_In_House_Consultancy);
                    $("#Basic_Data_Pulls").val(response.Basic_Data_Pulls);
                    $("#PL_Support").val(response.PL_Support);
                    $("#Onboarding").val(response.Onboarding);
                    $("#Mgmt_Of_Cross_Practice_Tasks").val(response.Mgmt_Of_Cross_Practice_Tasks);
                    $("#Finance_Support").val(response.Finance_Support);
                    $("#Dashboards").val(response.Dashboards);
                    $("#Brands_And_Clients").val(response.Brands_And_Clients);
                    $("#Customized_Reporting").val(response.Customized_Reporting);
                    $("#Global_Support").val(response.Global_Support);
                    $("#Director").val(response.Director);
                    $("#Supervisor").val(response.Supervisor);
                    $("#Associate_Director").val(response.Associate_Director);
                    $("#Associate").val(response.Associate);

                    var total = parseFloat($("#Director").val()) + parseFloat($("#Supervisor").val()) + parseFloat($("#Associate_Director").val()) + parseFloat($("#Associate").val());
                    $("#client-operations-total").val(total);

                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });

        },

        delete_Client_Scenario: function (scenarioId) {
            $("#delete-scenario-modal").modal('show');
            $("#delete-scenario-id").val(scenarioId);
            $("#delete-department-id").val(7); //Id for Client/Operations is 7            
        },

        markFinal_Client_Scenario: function (scenarioId, businessId) {
            $("#final-scenario-modal").modal('show');
            $("#final-scenario-id").val(scenarioId);
            $("#final-business-id").val(businessId);
        },

        download_Client_Scenario: function (scenarioId) {
            $("#download-scenario-modal").modal('show');
            $("#download-scenario-id").val(id);
        },
    }
})();

