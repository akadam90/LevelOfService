if (typeof (LOS) == "undefined") {
    var LOS = {};
}

if (typeof (LOS.Departments) == "undefined") {
    LOS.Departments = {};
}


LOS.Departments.TAAG_Estimate = (function () {
    var _config;

    return {

        init: function (config) {
            _config = config;

            $("#new-taag-estimate-scenario").click(function () {
                LOS.Departments.TAAG_Estimate.new_TAAG_Estimate();
            });

            $("#input-taag-billings").change(function () {
                var d = $("#input-taag-billings option:selected").val();
                if (d == 0) {
                    //clear the form here
                }
                else {
                    $.ajax({
                        url: _config.getFTEsUrl,
                        dataType: 'json',
                        type: 'GET',
                        data: {
                            id: d,
                        },
                        success: function (response) {
                            $("#taag-director").val(parseFloat(response.Director));
                            $("#taag-supervisor-tech-ops").val(parseFloat(response.Supervisor_Tech_Ops));
                            $("#taag-associate-director").val(parseFloat(response.Associate_Director));
                            $("#taag-associate-analyst").val(parseFloat(response.Associate_Analyst));
                            $("#taag-supervisor-analyst").val(parseFloat(response.Supervisor_Analyst));
                            $("#taag-associate-tech-ops").val(parseFloat(response.Associate_Tech_Ops));
                            $("#taag-cpm").val(parseFloat(response.Recommended_CPM));
                            $("#taag-service-level").val(response.Service_Level);

                            var total = parseFloat($("#taag-director").val()) + parseFloat($("#taag-supervisor-tech-ops").val()) + parseFloat($("#taag-associate-director").val()) + parseFloat($("#taag-associate-analyst").val()) + parseFloat($("#taag-supervisor-analyst").val()) + parseFloat($("#taag-associate-tech-ops").val());
                            $("#taag-total").val(total);
                        },
                        error: function (xhr, status, error) {
                            alert(error);
                        }
                    });
                }
            });

            $('#taagTabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                if (e.target.id == "taag-scenarios-tab") {

                }
                else if (e.target.id == "taag-survey-tab") {

                }
                else if (e.target.id == "taag-submitted-tab") {

                }
            });

            /*DataTable initialized for page loading*/
            $("#taag-scenarios-dataTable").DataTable({
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
                if ($.fn.DataTable.isDataTable("#taag-scenarios-dataTable")) {
                    $('#taag-scenarios-dataTable').DataTable().clear().destroy();
                }

                $("#taag-scenarios-dataTable").DataTable({
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

                if ($.fn.DataTable.isDataTable("#taag-scenarios-dataTable")) {
                    $('#taag-scenarios-dataTable').DataTable().clear().destroy();
                }

                $("#taag-scenarios-dataTable").DataTable({
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
                             return '<div class="dropdown"><a class="taag-option-links" id="taag-option-link-"' + row.Id + ' data-toggle="dropdown"> <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span></a> <ul class="dropdown-menu" aria-labelledby="dLabel"><li><a class="edit-taag-links" id="edit-taag-link-' + row.Id + '">Edit Scenario</a></li><li><a class="delete-taag-links" id="delete-taag-link-' + row.Id + '">Delete Scenario</a></li><li><a class="final-taag-links" id="final-taag-link-' + row.Id + '">Mark Final</a></li><li><a class="download-taag-links" id="download-taag-link-' + row.Id + '">Download Scenario</a></li></ul></div>';
                         }
                     },
                     {
                         data: 'Name',
                         render: function (data, type, row) {
                             if (row.IsFinal == false) {
                                 return '<a href="javascript:void(0)" class="taag-scenario-link" id=taag-scenario-link-' + row.Id + '>' + row.Name + '</a>';
                             }
                             else {
                                 return '<a href="javascript:void(0)" class="taag-scenario-link" id=taag-scenario-link-' + row.Id + '>' + row.Name + '</a> <a class="surveyLinks" id="fill-survey-' + row.BusinessId + '"><i>Final</i></a>';
                             }
                         }
                     },
                    ],

                    drawCallback: function (settings) {
                        $('#taag-scenarios-dataTable .taag-scenario-link').unbind('click');
                        $('#taag-scenarios-dataTable .taag-scenario-link').click(function () {
                            var scenarioId = $(this).attr('id').replace('taag-scenario-link-', '');
                            LOS.Departments.Taag_Estimate.edit_Taag_Scenario(scenarioId);
                        });

                        $("#taag-scenarios-dataTable .taag-option-links").unbind('click');
                        $("#taag-scenarios-dataTable .taag-option-links").click(function () {
                            var id = $(this).attr('id').replace('taag-option-link-', '');
                        });

                        $("#taag-scenarios-dataTable .edit-taag-links").unbind('click');
                        $("#taag-scenarios-dataTable .edit-taag-links").click(function () {
                            var scenarioId = $(this).attr('id').replace("edit-taag-link-", "");
                            alert("Editing " + scenarioId);
                            LOS.Departments.Taag.edit_Estimate.edit_Taag_Scenario(scenarioId);
                        });

                        $("#taag-scenarios-dataTable .delete-taag-links").unbind('click');
                        $("#taag-scenarios-dataTable .delete-taag-links").click(function () {
                            var scenarioId = $(this).attr('id').replace("delete-taag-link-", "");
                            alert("Deleting " + scenarioId);
                            LOS.Departments.Taag_Estimate.delete_Taag_Scenario(scenarioId);
                        });

                        $("#taag-scenarios-dataTable .final-taag-links").unbind('click');
                        $("#taag-scenarios-dataTable .final-taag-links").click(function () {
                            var scenarioId = $(this).attr('id').replace("final-taag-link-", "");
                            var businessId = $('#business-select option:selected').val();
                            alert("Mark Final " + scenarioId);
                            LOS.Departments.Taag_Estimate.mark_Final_Taag_Scenario(scenarioId, businessId);
                        });


                        $("#taag-scenarios-dataTable .download-taag-links").unbind('click');
                        $("#taag-scenarios-dataTable .download-taag-links").click(function () {
                            var scenarioId = $(this).attr('id').replace("download-taag-link-", "");
                            LOS.Departments.Taag_Estimate.download_Taag_Scenario(scenarioId);
                        });

                    }
                });

            });
        },

        new_TAAG_Estimate: function () {
            $("#tag-estimate-modal").modal("show");
            
        }
    }
})();

