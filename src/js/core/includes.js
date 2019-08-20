import $ from 'jquery'

function loadIncludes(parent){
    if(!parent) parent = 'body'
    //procurando dentro do parent todos os elementos que possuem 'wm-include'
    $(parent).find('[wm-include]').each(function(i, e){
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            success(data){
                $(e).html(data)
                $(e).removeAttr('wm-include')

                loadIncludes(e)
            }
        })
    })
}

loadIncludes()