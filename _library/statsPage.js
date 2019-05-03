import { getInsertButton, getEditDeleteButtons } from "./buttonsCRUD.js";
import { databaseData } from "./dataBaseData.js";
import { error_not_implemented } from "./errorHandler.js";
import { randomPicture } from "./picsVids.js";

/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the logic to support creating
 *  the stats page.
 */

function addDynRow(tableId, prefix) {
    $('#' + tableId).append($('<tr>')
        .append($('<td>')
            .addClass('opponent')
            .html(prefix)
        )
        .append($('<td>')
            .attr('id', prefix + 'Assists')
            .addClass('assists')
            .html("")
        )
        .append($('<td>')
            .attr('id', prefix + 'Blocks')
            .addClass('blocks')
            .html("")
        )
        .append($('<td>')
            .attr('id', prefix + 'Kills')
            .addClass('kills')
            .html("")
        )
        .append($('<td>')
            .attr('id', prefix + 'Digs')
            .addClass('digs')
            .html("")
        )
        .append($('<td>')
            .attr('id', prefix + 'Serves')
            .addClass('serves')
            .html("")
        )
        .append($('<td>')
            .attr('id', prefix + 'Aces')
            .addClass('aces')
            .html("")
        )
        .append($('<td>')
            .attr('id', prefix + 'Sideouts')
            .addClass('sideOut')
            .html("")
        )
        .append($('<td>')
            .addClass('modify')
            .html("")
            .hide()
        )
    );
}

function addHiddenInsertStatRow(tableId) {
    $('#' + tableId).append($('<tr>')
        .append($('<td>')
            .addClass('opponent')
            .html("")
        )
        .append($('<td>')
            .addClass('assists')
            .html("")
        )
        .append($('<td>')
            .addClass('blocks')
            .html("")
        )
        .append($('<td>')
            .addClass('kills')
            .html("")
        )
        .append($('<td>')
            .addClass('digs')
            .html("")
        )
        .append($('<td>')
            .addClass('serves')
            .html("")
        )
        .append($('<td>')
            .addClass('aces')
            .html("")
        )
        .append($('<td>')
            .addClass('sideOut')
            .html("")
        )
        .append($('<td>')
            .addClass('modify')
            .html(getInsertButton())
        )
    );

    $('.iBtn').on("click", error_not_implemented);
}

function addStatRow(row, tableId) {
    $('#' + tableId).append($('<tr>')
        .append($('<td>')
            .addClass('opponent')
            .html(row.opponent)
        )
        .append($('<td>')
            .addClass('assists')
            .html(row.assists)
        )
        .append($('<td>')
            .addClass('blocks')
            .html(row.blocks)
        )
        .append($('<td>')
            .addClass('kills')
            .html(row.kills)
        )
        .append($('<td>')
            .addClass('digs')
            .html(row.digs)
        )
        .append($('<td>')
            .addClass('serves')
            .html(row.serves)
        )
        .append($('<td>')
            .addClass('aces')
            .html(row.aces)
        )
        .append($('<td>')
            .addClass('sideOut')
            .html(row.sideouts)
        )
        .append($('<td>')
            .addClass('modify')
            .html(getEditDeleteButtons())
        )
    );

    $('.eBtn').on("click", error_not_implemented);
    $('.dBtn').on("click", error_not_implemented);
}

function getPropertySumAvg(arr, property) {
    let tot = 0;
    let avg = 0;
    tot = arr.reduce(function (a, b) {
        return a + parseInt(b[property])
    }, 0);
    avg = (tot / arr.length).toFixed(2);
    return { total: tot, average: avg };
}

function getYearStats(year) {
    let result = 0;
    let statList = databaseData.getStats();
    let yearStats = statList.filter(function (obj) {
        return (obj.year === year)
    });

    for (let x in yearStats) {
        addStatRow(yearStats[x], "statTab");
    }
    addHiddenInsertStatRow('statTab');
    addDynRow('statTab', 'Totals');
    addDynRow('statTab', 'Averages');

    result = getPropertySumAvg(yearStats, 'assists');
    $('#TotalsAssists').text(result.total);
    $('#AveragesAssists').text(result.average);

    result = getPropertySumAvg(yearStats, 'blocks');
    $('#TotalsBlocks').text(result.total);
    $('#AveragesBlocks').text(result.average);

    result = getPropertySumAvg(yearStats, 'kills');
    $('#TotalsKills').text(result.total);
    $('#AveragesKills').text(result.average);

    result = getPropertySumAvg(yearStats, 'digs');
    $('#TotalsDigs').text(result.total);
    $('#AveragesDigs').text(result.average);

    result = getPropertySumAvg(yearStats, 'serves');
    $('#TotalsServes').text(result.total);
    $('#AveragesServes').text(result.average);

    result = getPropertySumAvg(yearStats, 'aces');
    $('#TotalsAces').text(result.total);
    $('#AveragesAces').text(result.average);

    result = getPropertySumAvg(yearStats, 'sideouts');
    $('#TotalsSideouts').text(result.total);
    $('#AveragesSideouts').text(result.average);
}

export function buildStatsTable(student, sport, year) {
    let statsPage = '\
    <div class="athleticPics">\
      <img id="p1" src="" class="sportLeft">\
      <img id="p2" src="" class="sportRight">\
    </div>\
    <div id="vbStatsTab">\
      <h1 id="statsSportYear"></h1>\
      <br>\
      <table id="statTab" class="centered-table" cellspacing="5" cellpadding="5" border="1" summary="Stats">\
        <caption>\
          <h3>Statistics</h3>\
        </caption>\
        <tbody>\
          <tr>\
            <th scope="col" class="opponent">Opponent</th>\
            <th scope="col" class="assits">Assists</th>\
            <th scope="col" class="blocks">Blocks</th>\
            <th scope="col" class="kills">Kills</th>\
            <th scope="col" class="digs">Digs</th>\
            <th scope="col" class="serves">Serves</th>\
            <th scope="col" class="aces">Aces</th>\
            <th scope="col" class="sideOut">Side Out</th>\
            <th scope="col" class="modify"></th>\
          </tr>\
        </tbody>\
      </table>\
    </div>'

    $("#main").append(statsPage);
    $("#statsSportYear").text(year + " " + sport + " Stats");
    $("#p1").attr("src", randomPicture(student, sport));
    $("#p2").attr("src", randomPicture(student, sport));
    getYearStats(year);
}