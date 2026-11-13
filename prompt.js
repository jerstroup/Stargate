// Shared: wires up "Copy" / "Download" buttons for setup prompts.
// Markup: <script type="text/plain" id="X"> prompt </script>
//         <pre data-prompt-view="X"></pre>
//         <button data-prompt-copy="X"> / <button data-prompt-download="X" data-filename="...">
(function () {
  function text(id) {
    var el = document.getElementById(id);
    return el ? el.textContent.replace(/^\n+/, "").replace(/\s+$/, "") + "\n" : "";
  }
  function flash(btn, label) {
    var orig = btn.textContent;
    btn.textContent = label;
    btn.classList.add("done");
    setTimeout(function () { btn.textContent = orig; btn.classList.remove("done"); }, 1800);
  }
  function fallbackCopy(value) {
    var ta = document.createElement("textarea");
    ta.value = value;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    return ok;
  }
  document.querySelectorAll("[data-prompt-view]").forEach(function (pre) {
    pre.textContent = text(pre.getAttribute("data-prompt-view"));
  });
  document.querySelectorAll("[data-prompt-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = text(btn.getAttribute("data-prompt-copy"));
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(
          function () { flash(btn, "Copied ✓"); },
          function () { flash(btn, fallbackCopy(value) ? "Copied ✓" : "Copy failed"); }
        );
      } else {
        flash(btn, fallbackCopy(value) ? "Copied ✓" : "Copy failed");
      }
    });
  });
  document.querySelectorAll("[data-prompt-download]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var blob = new Blob([text(btn.getAttribute("data-prompt-download"))], { type: "text/markdown" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = btn.getAttribute("data-filename") || "setup-prompt.md";
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
      flash(btn, "Downloaded ✓");
    });
  });
})();
