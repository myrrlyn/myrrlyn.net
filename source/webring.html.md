---
title: WebRing
category: local
---

YOU: please show me the blogs in the order that they were made

WEBSITE: thats too hard. heres some people i think are good. Do you like this

----

<div id="shuf" markdown="block">

- [Amanda](//notawful.org)
- [Arshia Mufti](//arshiamufti.com)
- [David Barsky](//davidbarsky.com)
- [Eliza Weisman](//elizas.website)
- [Harrison Goscenski](//hgoscenski.com)
- [Manish Goregaokar](//manishearth.github.io)
- [Michael Gattozzi](//mgattozzi.com)
- [Quiet Misdreavus](//quietmisdreavus.net)

</div>

<script type="text/javascript">
var shuf_interval = 5000;
var timer = null;
function shuf() {
    $("#shuf ul").html($("#shuf ul li").sort(() => 0.5 - Math.random()));
    shuf_interval *= 1.2;
    if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
    }
    // if (shuf_interval < 120000) {
        timer = window.setTimeout(shuf, shuf_interval);
    // }
}
$(document).ready(shuf);
</script>
