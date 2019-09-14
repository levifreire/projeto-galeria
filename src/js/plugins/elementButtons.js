import $ from 'jquery'

import { onLoadHtmlSuccess } from '../core/includes'

const duration = 500

function filterByElement(element){
    $('[wm-element]').each(function(i, e){
        const isTarget = $(this).attr('wm-element') === element
            || element === null
        if(isTarget){
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    
    })
}

$.fn.elementButtons = function(){

const elements = new Set
$('[wm-element]').each(function (i, e){
    elements.add($(e).attr('wm-element'))
})

const btns = Array.from(elements).map(element => {
    const btn = $('<button>')
        .addClass(['btn', 'btn-info']).html(element)
    btn.click(e => filterByElement(element))
    return btn
})

const btnAll = $('<button>')
    .addClass(['btn', 'btn-info', 'active']).html('Todas')
btnAll.click(e => filterByElement(null))
btns.push(btnAll)

const btnGroup = $('<div>').addClass(['btn-group'])
btnGroup.append(btns)

$(this).html(btnGroup)

return this

}

onLoadHtmlSuccess(function() {
    $('[wm-element-buttons]').elementButtons()
})
