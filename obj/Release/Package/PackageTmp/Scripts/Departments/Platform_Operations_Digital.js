if (typeof (LOS) == "undefined") {
    var LOS = {};
}

if (typeof (LOS.Departments) == "undefined") {
    LOS.Departments = {};
}


LOS.Departments.Platform_Operations_Digital = (function () {
    var _config;
    return {

        init: function (config) {
            _config = config;

            $("#new-digital-scenario").click(function () {
                LOS.Departments.Platform_Operations_Digital.new_Digital();
            });

            $("#input-digital-net-billings").change(function () {
                var d = $("#input-digital-net-billings option:selected").val();

                $.ajax({
                    url: _config.getFTEsUrl,
                    dataType: 'json',
                    type: 'GET',
                    data: {
                        id: d,
                    },
                    success: function (response) {
                        var data = response;
                        $("#platform-digital-director").val(response.Director);
                        $("#platform-digital-supervisor").val(response.Supervisor);
                        $("#platform-digital-associate-director").val(response.Associate_Director);
                        $("#platform-digital-associate").val(response.Associate);

                        var total = parseFloat($("#platform-digital-director").val()) + parseFloat($("#platform-digital-supervisor").val()) + parseFloat($("#platform-digital-associate-director").val()) + parseFloat($("#platform-digital-associate").val());
                        $("#platform-digital-total").val(total);

                    },
                    error: function (xhr, status, error) {
                        alert(error);
                    }
                })
            });

            $('#digitalTabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                if (e.target.id == "digital-scenarios-tab") {

                }
                else if (e.target.id == "digital-survey-tab") {

                }
                else if (e.target.id == "digital-submitted-tab") {

                }
            });

            /*DataTable initialized for page loading*/
            $("#digital-scenarios-dataTable").DataTable({
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
                if ($.fn.DataTable.isDataTable("#digital-scenarios-dataTable")) {
                    $('#digital-scenarios-dataTable').DataTable().clear().destroy();
                }

                $("#digital-scenarios-dataTable").DataTable({
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

                if ($.fn.DataTable.isDataTable("#digital-scenarios-dataTable")) {
                    $('#digital-scenarios-dataTable').DataTable().clear().destroy();
                }

                $("#digital-scenarios-dataTable").DataTable({
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
                             return '<div class="dropdown"><a class="digital-option-links" id="digital-option-link-"' + row.Id + ' data-toggle="dropdown"> <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span></a> <ul class="dropdown-menu" aria-labelledby="dLabel"><li><a class="edit-digital-links" id="edit-digital-link-' + row.Id + '">Edit Scenario</a></li><li><a class="delete-digital-links" id="delete-digital-link-' + row.Id + '">Delete Scenario</a></li><li><a class="final-digital-links" id="final-digital-link-' + row.Id + '">Mark Final</a></li><li><a class="download-digital-links" id="download-digital-link-' + row.Id + '">Download Scenario</a></li></ul></div>';
                         }
                     },
                     {
                         data: 'Name',
                         render: function (data, type, row) {
                             if (row.IsFinal == false) {
                                 return '<a href="javascript:void(0)" class="digital-scenario-link" id=digital-scenario-link-' + row.Id + '>' + row.Name + '</a>';
                             }
                             else {
                                 return '<a href="javascript:void(0)" class="digital-scenario-link" id=digital-scenario-link-' + row.Id + '>' + row.Name + '</a> <a class="surveyLinks" id="fill-survey-' + row.BusinessId + '"><i>Final</i></a>';
                             }
                         }
                     },
                    ],

                    drawCallback: function (settings) {
                        $('#digital-scenarios-dataTable .digital-scenario-link').unbind('click');
                        $('#digital-scenarios-dataTable .digital-scenario-link').click(function () {
                            var scenarioId = $(this).attr('id').replace('digital-scenario-link-', '');
                            LOS.Departments.Platform_Operations_Digital.edit_Digital_Scenario(scenarioId);
                        });

                        $("#digital-scenarios-dataTable .digital-option-links").unbind('click');
                        $("#digital-scenarios-dataTable .digital-option-links").click(function () {
                            var id = $(this).attr('id').replace('digital-option-link-', '');
                        });

                        $("#digital-scenarios-dataTable .edit-digital-links").unbind('click');
                        $("#digital-scenarios-dataTable .edit-digital-links").click(function () {
                            var scenarioId = $(this).attr('id').replace("edit-digital-link-", "");
                            alert("Editing " + scenarioId);
                            LOS.Departments.Platform_Operations_Digital.edit_Digital_Scenario(scenarioId);
                        });

                        $("#digital-scenarios-dataTable .delete-digital-links").unbind('click');
                        $("#digital-scenarios-dataTable .delete-digital-links").click(function () {
                            var scenarioId = $(this).attr('id').replace("delete-digital-link-", "");
                            alert("Deleting " + scenarioId);
                            LOS.Departments.Platform_Operations_Digital.delete_Digital_Scenario(scenarioId);
                        });

                        $("#digital-scenarios-dataTable .final-digital-links").unbind('click');
                        $("#digital-scenarios-dataTable .final-digital-links").click(function () {
                            var scenarioId = $(this).attr('id').replace("final-digital-link-", "");
                            var businessId = $('#business-select option:selected').val();
                            alert("Mark Final " + scenarioId);
                            LOS.Departments.Platform_Operations_Digital.mark_Final_Digital_Scenario(scenarioId, businessId);
                        });


                        $("#digital-scenarios-dataTable .download-digital-links").unbind('click');
                        $("#digital-scenarios-dataTable .download-digital-links").click(function () {
                            var scenarioId = $(this).attr('id').replace("download-digital-link-", "");
                            LOS.Departments.Bill_Pay_Traffic.download_Digital_Scenario(scenarioId);
                        });

                    }
                });
            });

                       

            $("#digital-form").submit(function (event) {
                event.preventDefault();

                var digitalInput = $("#input-digital-net-billings option:selected").val();
                var businessId = $("#digital-business-id").val();
                var scenarioId = $("#digital-scenario-id").val();               

                if (digitalInput == 0)
                {
                    $("#message-modal").modal('show');
                    $("#message-modal .modal-body p").remove();
                    $("#message-modal .modal-body").append("<p>Please select NET Billings</p>");                    
                }
                else
                {
                    $.ajax({
                        url: _config.saveDigitalScenario,
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            scenarioId : scenarioId,
                            businessId : businessId,
                            digitalId: digitalInput,
                        },
                        success: function (response) {
                            $("#message-modal").modal('show');
                            $("#message-modal .modal-body p").remove();

                            if (response == true) {
                                $("#digital-modal").modal("hide");
                                $("#message-modal .modal-body").append("<p>Scenario Saved Successfully</p>");
                                $("#digital-scenarios-dataTable").DataTable().ajax.reload();

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
                            $("#digital-scenarios-dataTable").DataTable().ajax.reload();
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
                            $("#digital-scenarios-dataTable").DataTable().ajax.reload();
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

        new_Digital: function () {              
            var businessId = parseInt($('#business-select option:selected').val());
            if (businessId == 0) {
                $("#message-modal").modal('show');
                $("#message-modal .modal-body p").remove();
                $("#message-modal .modal-body").append("<p>Select Business to add new Scenario</p>");
            }
            else {
                $("#digital-modal").modal("show");
                $("#digital-form")[0].reset();
                $("#digital-scenario-id").val(0);
                $("#digital-business-id").val(businessId);
            }
        },

        edit_Digital_Scenario: function (scenarioId) {
            var businessId = parseInt($('#business-select option:selected').val());

            $.ajax({
                url: _config.getScenario,
                dataType: 'json',
                type: 'GET',
                data: {
                    scenarioId: scenarioId,
                },
                success: function (response) {                    

                    $("#digital-modal").modal('show');
                    $("#digital-form")[0].reset();
                    $("#digital-business-id").val(businessId);
                    $("#digital-scenario-id").val(scenarioId);
                    $("#input-digital-net-billings").val(response.Id);
                    $("#platform-digital-director").val(response.Director);
                    $("#platform-digital-supervisor").val(response.Supervisor);
                    $("#platform-digital-associate-director").val(response.Associate_Director);
                    $("#platform-digital-associate").val(response.Associate);

                    var total = parseFloat($("#platform-digital-director").val()) + parseFloat($("#platform-digital-supervisor").val()) + parseFloat($("#platform-digital-associate-director").val()) + parseFloat($("#platform-digital-associate").val());
                    $("#platform-digital-total").val(total);
                    
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });

        },

        delete_Digital_Scenario: function (scenarioId) {
        $("#delete-scenario-modal").modal('show');
        $("#delete-scenario-id").val(scenarioId);
        $("#delete-department-id").val(2); //Id for Bill/Pay department is 1            
    },
        
        mark_Final_Digital_Scenario: function (scenarioId, businessId) {
        $("#final-scenario-modal").modal('show');           
        $("#final-scenario-id").val(scenarioId);
        $("#final-business-id").val(businessId);
    },

        download_Digital_Scenario: function (scenarioId) {
        $("#download-scenario-modal").modal('show');
        $("#download-scenario-id").val(id);
    },
    }
})();

