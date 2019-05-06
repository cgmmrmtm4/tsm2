import { getEditDeleteButtons, getInsertButton } from "./buttonsCRUD.js";
import { error_not_implemented } from "./errorHandler.js";
import { isAuthorized } from "./auth.js";

/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the logic to support editing
 *  and inserting an athletic entry.
 */

/*
 *  Add a row to the academic table.
 */
export function addAthleticRow(row, tableId) {
    $('#' + tableId).append($('<tr>')
        .append($('<td>')
            .addClass('dbId')
            .html(row.id)
            .hide()
        )
        .append($('<td>')
            .addClass('gameDate')
            .html(row.date.slice(5))
        )
        .append($('<td>')
            .addClass('location')
            .html(row.location)
        )
        .append($('<td>')
            .addClass('league')
            .html(row.league)
        )
        .append($('<td>')
            .addClass('opponent')
            .html(row.opponent)
        )
        .append($('<td>')
            .addClass('matchScore')
            .html(row.score)
        )
        .append($('<td>')
            .addClass('result')
            .html(row.result)
        )
        .append($('<td>')
            .addClass('modify')
            .html(getEditDeleteButtons())
            .hide()
        )
    );

    if (isAuthorized.getAuth()) {
        $('.eBtn').on("click", error_not_implemented);
        $('.dBtn').on("click", error_not_implemented);
        $('.modify').show();
    }
}

export function addHiddenAthleticInsertRow(tableId) {
    $('#' + tableId).append($('<tr>')
        .append($('<td>')
            .addClass('dbId')
            .html("")
            .hide()
        )
        .append($('<td>')
            .addClass('gameDate')
            .html("")
        )
        .append($('<td>')
            .addClass('location')
            .html("")
        )
        .append($('<td>')
            .addClass('league')
            .html("")
        )
        .append($('<td>')
            .addClass('opponent')
            .html("")
        )
        .append($('<td>')
            .addClass('matchScore')
            .html("")
        )
        .append($('<td>')
            .addClass('result')
            .html("")
        )
        .append($('<td>')
            .addClass('modify')
            .html(getInsertButton())
        )
    );

    $('.iBtn').on("click", error_not_implemented);
}