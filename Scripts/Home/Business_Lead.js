if (typeof (LOS) == "undefined") {
    var LOS = {};
}

if (typeof (LOS.Home) == "undefined") {
    LOS.Home = {};
}

LOS.Home.Business_Lead = (function() {
    var _config;

    return{
        init: function (config) {

            _config = config;
                                           
            //This on event is called before opening any new tab within the Business Modal
            $('#bussiness_tabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                //if Survey Tab is opened 
                if (e.target.id == "survey-tab")  
                {                    
                    var busId = $("#input-survey-business-id").val();
                    if (busId != 0)         //fill up the survey for the business if it is filled before
                    {
                        $.ajax({
                            url: _config.getSurvey,
                            dataType: 'json',
                            type: 'GET',
                            data: {
                                businessId : busId
                            },
                            contentType: 'application/json',
                            success: function (response) { 
                                var data = response;
                                //If Survey Responses are not null i.e if Survey has been filled before then
                                if (data != null) {                                                                    
                                    for (var i = 0; i < data.length; i++)
                                    {                                        
                                        if (data[i].QuestionType == "TextBox") {          //text input                                            
                                            $("#input-question-" + data[i].QuestionId).val(data[i].Value);
                                        }
                                        else if(data[i].QuestionType == "Radio" || data[i].QuestionType == "CheckBox") {
                                            $("#input-question-" + data[i].QuestionId + "-option-" + data[i].OptionId).prop("checked", true);
                                        }
                                        else if(data[i].QuestionType == "Dropdown"){
                                            $("#input-question-" + data[i].QuestionId).val(data[i].OptionId);
                                        }
                                        
                                    }                                                                        
                                }                                
                            },
                            error: function (xhr, status, error) {
                                $("#message-modal").modal('show');
                                $("#message-modal .modal-body p").remove();
                                $("#message-modal .modal-body").append("<p>"+error+"</p>");
                            }
                        });
                    }
                }
                else if (e.target.id == "submitted-tab")
                {
                
                }
                else if (e.target.id == "negotiated-tab")
                {
                
                }
                else if (e.target.id == "delta-tab")
                {
                
                }
                //e.relatedTarget // previous active tab                
            })           
            //$('#business-dataTable .business-link').click(function () {
            //    alert("Hello");
            //    $("#business_modal .panel-collapse").collapse('hide');
            //    //$("#business_modal #bill_pay_traffic_collapse").collapse('show');
            //    //$('#business_modal .panel-collapse.in').collapse('show');
            //});

            /*DataTable initialized for page loading*/
            $("#business-dataTable").DataTable({
                bPaginate: false,
                bLengthChange: false,
                bFilter: true,
                bInfo: false,
                bAutoWidth: false,                
                columns: [
                 {
                     data: 'BusinessName',                 
                 },
                 {
                     data: 'BusinessType'
                 },
                 {
                     data: 'BusinessStatus'
                 },
                 { data: 'BusinessYear' }
                ],
                language: {
                    "emptyTable": "Select Client to view Businesses"
                }   
            });

            /*DataTable re-initialized for different client (Based on Client Dropdown )*/
            $("#input-client").change(function () {
                var client = $("#input-client option:selected").val();                
                if ($.fn.DataTable.isDataTable("#business-dataTable"))
                {
                    $('#business-dataTable').DataTable().clear().destroy();
                }

                $("#business-dataTable").DataTable({
                    bPaginate: false,
                    bLengthChange: false,
                    bFilter: true,
                    bInfo: false,
                    bAutoWidth: false,
                    ajax: {
                        url: _config.getAllBusinesses,
                        type: "GET",
                        data: {
                            clientId: client
                        },
                        dataSrc: function (responseData) {
                            return responseData;
                        },
                    },
                    columns: [
                     {
                         data: 'BusinessName',
                         render: function (data, type, row) {
                             if (row.SurveyFilled == true) {
                                 return '<a href="javascript:void(0)" class="business-link" id=business-link-' + row.BusinessId + '>' + row.BusinessName + '</a>';
                             }
                             else {
                                 return '<a href="javascript:void(0)" class="business-link" id=business-link-' + row.BusinessId + '>' + row.BusinessName + '</a> <a class="surveyLinks" id="fill-survey-' + row.BusinessId + '">Complete the Survey</a>';
                             }
                         }
                     },
                     {
                         data: 'BusinessType'
                     },
                     {
                         data: 'BusinessStatus'
                     },
                     { data: 'BusinessYear' }
                    ],
                    language: {
                        "emptyTable": "No Business created for this client"
                    },
                    drawCallback: function (settings) {
                        $('#business-dataTable .business-link').unbind('click');
                        $('#business-dataTable .business-link').click(function () {
                            var id = $(this).attr('id').replace('business-link-', '');
                            $("#business_modal").modal('show');
                            $("#business_modal .in").collapse("hide");
                            $("#survey-form")[0].reset();
                            $("#bussiness_tabs li a[id=submitted-tab]").tab('show');
                            $("#input-survey-business-id").val(id);
                        });

                        $("#business-dataTable .surveyLinks").unbind('click');
                        $("#business-dataTable .surveyLinks").click(function () {
                            var id = $(this).attr('id').replace('fill-survey-', '');
                            $("#business_modal").modal('show');
                            $("#business_modal .in").collapse("hide");
                            $("#survey-form")[0].reset();
                            $("#input-survey-business-id").val(id);
                            $("#bussiness_tabs li a[id=survey-tab]").tab('show');
                        });
                    }
                });
            });

            

            $('#new-business-btn').click(function () {               
                document.getElementById("new-business-form").reset();                
                $("#new-business-modal").modal("show");                
                
            });

            $("#input-business-client").change(function () {
                var d = $("#input-business-client option:selected").val();
                if (d == 0)
                {                  
                    $("#new-client-modal").modal("show");
                }
            });

            $("#new-client-form").submit(function (event) {
                event.preventDefault();               
                var formData = JSON.stringify($(this).serializeArray());

                $.ajax({
                    url: $(this).attr('action'),
                    dataType: 'json',
                    type: 'POST',
                    data: $.parseJSON(formData),
                    success: function (response) {
                        $("#new-client-modal").modal("hide");
                        $("#message-modal").modal('show');
                        $("#message-modal .modal-body p").remove();
                        $("#message-modal .modal-body").append("<p>Client Added Successfully</p>");                        

                        $.ajax({
                            url: _config.getClients,
                            dataType : 'json',
                            type: 'GET',
                            success: function (response) {                               
                                var clients = response;
                                
                                $("#input-business-client option").remove();
                                $("#input-business-client").append($("<option/>", {                                    
                                    value:-1,
                                    text:"---"
                                }));

                                for(var i=0;i<clients.length;i++)
                                {
                                    $("#input-business-client").append($("<option/>", {
                                        id: "business-client-" + clients[i].Id,
                                        value: clients[i].Id,
                                        text: clients[i].Client
                                    }));
                                }

                                $("#input-business-client").append($("<option/>", {                                    
                                    id:"business-client-0",
                                    value:0,
                                    text:"---New Client---"
                                }));                              
                            },

                     error: function (xhr,status,error) {
                         $("#message-modal").modal('show');
                         $("#message-modal .modal-body p").remove();                         
                         $("#message-div").append("<p>" + error + "</p>");
                            }
                        });                       
                    },
                    error: function (xhr, status, error) {
                        $("#message-modal").modal('show');
                        $("#message-modal .modal-body p").remove();
                        $("#message-modal .modal-body").append("<p>"+error+"</p>");
                    }

                });               
            });

            $("#new-business-form").submit(function (event) {
                event.preventDefault();                
                var formData = JSON.stringify($(this).serializeArray());

                $.ajax({                    
                    url: $(this).attr('action'),
                    type : 'POST',
                    dataType: 'json',
                    //contentType: 'application/json',
                    data: $.parseJSON(formData),
                    success: function (response) {
                        $("#message-modal").modal('show');
                        $("#message-modal .modal-body p").remove();

                        if (response.Success == true) {
                            $("#new-business-modal").modal("hide");
                            $("#message-modal .modal-body").append("<p>"+response.Message+"</p>");
                        }
                        else {
                            $("#message-modal .modal-body").append("<p>"+response.Message+"</p>");
                        }
                    },
                    error: function (xhr, status, error) {
                        $("#message-modal").modal('show');
                        $("#message-modal .modal-body p").remove();
                        $("#message-modal .modal-body").append("<p>"+error+"</p>");
                    }

                });
            });

            $("#survey-form").submit(function (event) {
                event.preventDefault();

                var formData = $(this).serialize();
                if (LOS.Home.Business_Lead.validateSurveyForm($(this))) {
                    $.ajax({
                        url: $(this).attr('action'),
                        type: 'POST',
                        //contentType: 'application/json',
                        data: formData,
                        success: function (reponse) {                                                      
                            $("#message-modal").modal('show');
                            $("#message-modal .modal-body p").remove();
                            $("#message-modal .modal-body").append("<p>Survey Saved Successfully</p>");
                                $("#business_modal").modal('hide');
                                $("#business-dataTable").DataTable().ajax.reload();

                        },
                        error: function (xhr, status, error) {
                            $("#message-modal").modal('show');
                            $("#message-modal .modal-body p").remove();
                            $("#message-modal .modal-body").append("<p>Saving survey encountered some problem</p>");
                        }

                    });
                }                                
            });
            
            
        },
    
         validateSurveyForm : function (form) {
            $("#survey-form span.errorItems").html("");
            var result = true;
            var unansweredCheckboxes = [];
            var unansweredRadios = [];

            //validate dropdowns
            //$("#survey-form select").each(function () {
            //    alert("Select " + $(this).attr("id"));
            //});

            //validate textboxes
            $("#survey-form :input[type=text]").each(function () {
                var type = $(this).attr("data-type");
                var data = $(this).val();
                var id = $(this).attr("name").split("-")[1];

                if (type == 'Number' && isNaN(data))
                {
                    $(".errorItems").append("<p>Enter a valid number input for Question " + id + "</p>");                    
                    result = false;
                }
                else if (type = 'Text' && data == '')
                {
                    $(".errorItems").append("<p>Enter a valid text input for Question " + id)+"</p>";
                    result = false;
                }                                
            });

            //validate radio inputs
            $("#survey-form :input[type=radio]").each(function () {
                var n = this.name.split('.')[1];    //questionId
                var val = $('input:radio[name$=' + n + ']:checked').val();               
                
                if (val === undefined) {
                    if (unansweredRadios.indexOf(n) == -1) {
                        $(".errorItems").append("<p>Check one of the options for Question " + n + "</p>");
                        unansweredRadios.push(n);
                        result = false;
                    }

                }
                            
            });

            //validate checkboxes' input
            $("#survey-form :input[type=checkbox]").each(function () {                             
                var n = this.name.split('.')[1];    //questionId
                var val = $('input:checkbox[name$=' + n + ']:checked').val();

                if (val == undefined) {
                    if (unansweredCheckboxes.indexOf(n) == -1) {
                        $(".errorItems").append("<p>Check one of the options for Question " + n + "</p>");
                        unansweredCheckboxes.push(n);
                        result = false;
                    }                    
                }               
            });

           
            
            return result;
        }
    }
    })();