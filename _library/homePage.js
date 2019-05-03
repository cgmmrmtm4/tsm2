/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the logic to build the home page
 */

/*
 *  Home event selected. Rebuild the main element
 */
export function buildHomeMain() {
    $('#hdrImg').attr('src', 'https://icqq9q.dm.files.1drv.com/y4mcbbkojMCLPcCjaTjITnanqctCz_XnQAN98IWmybVq9ANDyOlnTu_YZRZ8AZo2ozbUBZVNlZvZLal6d0ynJdAtm3IMZIAWsvLoOgT9FqmULG2mUfNSr4iKmeRaZ89aKaFxfSbJepUxo9AWVsLm2zcZM27AaqhIslNJsXQQpEY5H4G5ie4-D6eV5vgyjAC4EDtbxkUKGVdp2uf7BnfSDuJrg?width=139&height=134&cropmode=none');
    let homeMain = '\
    <div id="mbPics">\
      <img src="https://icqp9q.dm.files.1drv.com/y4mPlkRe7IND5abwHq1TM2Hi6g2DYC_t1DhOHO_sBAb0-sI_cfJ2h-cpB5VlqDwi3uxIRailvnRuEAm7GY04yzDtvK0zV8Aoal6f6cOz5szWFA9gOWVT3EfhABYY7JHK0BrwmaX1RVIlY2XHrE2wEZIBEXgP2AT-VDZKyze_EQGpDU_UYDtcyPnQEpwPMj8-M22XwcIW4cxPipmIOHOYgUZ_Q?width=267&height=189&cropmode=none" width="310" height="200" class="floatLeft"><img src="https://icqo9q.dm.files.1drv.com/y4m7m_KzbYtvldJomyqicDM0fYcFVzCAQjTYBZXFwChn5JBDJsAF4V8kQ7GBKPo8tkCom-Z-MKETkmPwpbgxHzMSnCE1RaXu6XiGL3UvHb2EUrPUbUjHFCOJLz_OzSOmT255Oj2eefSbjnbYZzGwVzjzWAmNq7Td03fgUtzMfw2WLBxL-0t-MFNsLciQsgsNH1Gv2-B9VZgRKivMfXO5XIbLg?width=377&height=133&cropmode=none" width="310" height="200" class="floatRight">\
    </div>\
    <div id="kidPics">\
      <img src="https://8ydviw.bl.files.1drv.com/y4mE65P6QJwr5Qq7YZaj5t5zFXbFGyJYEBUumtZxCKZ_UpZpnuQf88cTcuARqUd0hEE4hKdv3gBSBx8T_MG47GcDrERKCnKAuTJ16S6ldxHbnnIcV6PzO6VoumZpcIv8LlLtgIcCLuTgYPE8AZY20VbPFBG3B41qL8zhaM0wGRN2lbaYl-CSvwQpa4JoHicCzTutUEQQVFXx4M75t0MCLwBlQ?width=660&height=495&cropmode=none" width="310" height="375" class="floatLeft"><img src="https://q4fcdq.bl.files.1drv.com/y4mefARGRexS_vyBEBKsgsGYOBFrDP2sEoDpR9ayLjetxbSZ2hsyuunjiFIRdKXjlyNCZdwqBQUFF3CnsFIpR4vZYLk9syyNZ29qhCLpFRV6WtWmXFYFtAh2de0dxPBqFtULjhdtSZU-HETdqiz-nu3q3kAARcOD-EtjcytLT-mgkZMfKTQ_V4_0dnQcD1PIt6v0dYHzZyY6JffPgXe62ZEoA?width=660&height=437&cropmode=none" width="310" height="375" class="floatLeft">\
    </div>';
    $("#main").append(homeMain);
}

/*
 *  Home event selected. Rebuild the aside element
 */
export function buildHomeAside() {
    /*
     *  Add sidbar article
     */
    let homeAside = '\
    <article id="gradyr">\
      <h1>Our</h1>\
      <h1>Morro Bay</h1>\
      <h1>High School</h1>\
      <h1>Students</h1>\
    </article>';
    $("#sidebar").append(homeAside);
}