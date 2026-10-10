(function () {
  "use strict";

  var cfg = window.ElectrotransConfig;

  function notConfigured() {
    return (
      !cfg ||
      !cfg.SUPABASE_URL ||
      cfg.SUPABASE_URL.indexOf("YOUR_") === 0 ||
      !cfg.SUPABASE_ANON_KEY ||
      cfg.SUPABASE_ANON_KEY.indexOf("YOUR_") === 0
    );
  }

  var client = null;

  function loadSupabase() {
    return new Promise(function (resolve, reject) {
      if (window.supabase) return resolve(window.supabase);
      var script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      script.onload = function () { resolve(window.supabase); };
      script.onerror = function () { reject(new Error("Failed to load Supabase SDK")); };
      document.head.appendChild(script);
    });
  }

  function getClient() {
    if (client) return Promise.resolve(client);
    if (notConfigured()) {
      return Promise.reject(
        new Error("Supabase is not configured yet. Add your project URL and anon key to assets/js/supabase-config.js")
      );
    }
    return loadSupabase().then(function () {
      client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
      return client;
    });
  }

  function insert(table, payload) {
    return getClient().then(function (sb) {
      return sb.from(table).insert(payload);
    });
  }

  /* Admin helpers — require a signed-in Supabase Auth user */
  function getAdminClient() {
    return getClient().then(function (sb) {
      return sb.auth.getUser().then(function (auth) {
        if (auth.error || !auth.data || !auth.data.user) {
          return Promise.reject(new Error("Not signed in"));
        }
        return sb;
      });
    });
  }

  function adminFetch(role) {
    return getAdminClient().then(function (sb) {
      return sb
        .from(role)
        .select("*")
        .order("created_at", { ascending: false });
    });
  }

  function adminUpdateStatus(table, id, status) {
    return getAdminClient().then(function (sb) {
      return sb.from(table).update({ status: status }).eq("id", id);
    });
  }

  /* Public API */
  window.ElectrotransDB = {
    notConfigured: notConfigured,
    insert: insert,
    adminFetch: adminFetch,
    adminUpdateStatus: adminUpdateStatus,
    signIn: function (email, password) {
      return getClient().then(function (sb) {
        return sb.auth.signInWithPassword({ email: email, password: password });
      });
    },
    signOut: function () {
      return getClient().then(function (sb) {
        return sb.auth.signOut();
      });
    },
    onAuthChange: function (cb) {
      return getClient().then(function (sb) {
        return sb.auth.onAuthStateChange(cb);
      });
    }
  };
})();