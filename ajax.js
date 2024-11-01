jQuery(document).ready(function($){
	$('#simsignup_widget_form').submit(function(){

		var form = $(this),
		formData = form.serialize(),
        formMethod = form.attr('method'), 
        responseMsg = $('#simsignup_form_response');

        responseMsg.hide()
        .addClass('response-waiting')
        .html('<i class="fa fa-cog fa-spin"></i> Working...')
        .fadeIn(100);

        $.ajax({
        	url: simsignup_ajax.ajaxurl,
        	data: formData,
        	method: formMethod,
        	success: function(data) {

        		var responseData = jQuery.parseJSON(data), 
                    klass = '';
 
                //response conditional
                switch(responseData.status){
                    case 'error':
                        klass = 'alert-danger';
                    break;
                    case 'success':
                        klass = 'alert-success';
                    break;  
                }
 
                //show reponse message and apply classes
                responseMsg.fadeOut(200,function(){
                    $(this).removeClass('response-waiting')
                           .addClass(klass)
                           .text(responseData.message)
                           .fadeIn(200,function(){
                               //set timeout to hide response message
                               setTimeout(function(){
                                   responseMsg.fadeOut(200,function(){
                                       $(this).removeClass(klass);
                                   });
                               },3000);
                            });
                 });
        	}
        });
		return false; //prevent form from submitting
	});
});