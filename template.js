var template = function(exports) {
  "use strict";
  const UNINITIALIZED = Symbol();
  const FILENAME = Symbol("filename");
  const DEV = true;
  var bold = "font-weight: bold";
  var normal = "font-weight: normal";
  function ownership_invalid_mutation(component, owner) {
    {
      console.warn(`%c[svelte] ownership_invalid_mutation
%c${component ? `${component} mutated a value owned by ${owner}. This is strongly discouraged. Consider passing values to child components with \`bind:\`, or use a callback instead` : "Mutating a value outside the component that created it is strongly discouraged. Consider passing values to child components with `bind:`, or use a callback instead"}`, bold, normal);
    }
  }
  function state_proxy_equality_mismatch(operator) {
    {
      console.warn(`%c[svelte] state_proxy_equality_mismatch
%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${operator}\` will produce unexpected results`, bold, normal);
    }
  }
  var is_array = Array.isArray;
  var array_from = Array.from;
  var define_property = Object.defineProperty;
  var get_descriptor = Object.getOwnPropertyDescriptor;
  var get_descriptors = Object.getOwnPropertyDescriptors;
  var object_prototype = Object.prototype;
  var array_prototype = Array.prototype;
  var get_prototype_of = Object.getPrototypeOf;
  const DERIVED = 1 << 1;
  const EFFECT = 1 << 2;
  const RENDER_EFFECT = 1 << 3;
  const BLOCK_EFFECT = 1 << 4;
  const BRANCH_EFFECT = 1 << 5;
  const ROOT_EFFECT = 1 << 6;
  const UNOWNED = 1 << 7;
  const DISCONNECTED = 1 << 8;
  const CLEAN = 1 << 9;
  const DIRTY = 1 << 10;
  const MAYBE_DIRTY = 1 << 11;
  const INERT = 1 << 12;
  const DESTROYED = 1 << 13;
  const EFFECT_RAN = 1 << 14;
  const INSPECT_EFFECT = 1 << 17;
  const HEAD_EFFECT = 1 << 18;
  const EFFECT_HAS_DERIVED = 1 << 19;
  const STATE_SYMBOL = Symbol("$state");
  const STATE_SYMBOL_METADATA = Symbol("$state metadata");
  const LOADING_ATTR_SYMBOL = Symbol("");
  function equals(value) {
    return value === this.v;
  }
  function bind_invalid_export(component, key, name) {
    {
      const error = new Error(`bind_invalid_export
Component ${component} has an export named \`${key}\` that a consumer component is trying to access using \`bind:${key}\`, which is disallowed. Instead, use \`bind:this\` (e.g. \`<${name} bind:this={component} />\`) and then access the property on the bound component instance (e.g. \`component.${key}\`)`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function bind_not_bindable(key, component, name) {
    {
      const error = new Error(`bind_not_bindable
A component is attempting to bind to a non-bindable property \`${key}\` belonging to ${component} (i.e. \`<${name} bind:${key}={...}>\`). To mark a property as bindable: \`let { ${key} = $bindable() } = $props()\``);
      error.name = "Svelte error";
      throw error;
    }
  }
  function component_api_changed(parent, method, component) {
    {
      const error = new Error(`component_api_changed
${parent} called \`${method}\` on an instance of ${component}, which is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function component_api_invalid_new(component, name) {
    {
      const error = new Error(`component_api_invalid_new
Attempted to instantiate ${component} with \`new ${name}\`, which is no longer valid in Svelte 5. If this component is not under your control, set the \`compatibility.componentApi\` compiler option to \`4\` to keep it working. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function derived_references_self() {
    {
      const error = new Error(`derived_references_self
A derived value cannot reference itself recursively`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function effect_update_depth_exceeded() {
    {
      const error = new Error(`effect_update_depth_exceeded
Maximum update depth exceeded. This can happen when a reactive block or effect repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function rune_outside_svelte(rune) {
    {
      const error = new Error(`rune_outside_svelte
The \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function state_descriptors_fixed() {
    {
      const error = new Error(`state_descriptors_fixed
Property descriptors defined on \`$state\` objects must contain \`value\` and always be \`enumerable\`, \`configurable\` and \`writable\`.`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function state_prototype_fixed() {
    {
      const error = new Error(`state_prototype_fixed
Cannot set prototype of \`$state\` object`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function state_unsafe_local_read() {
    {
      const error = new Error(`state_unsafe_local_read
Reading state that was created inside the same derived is forbidden. Consider using \`untrack\` to read locally created state`);
      error.name = "Svelte error";
      throw error;
    }
  }
  function state_unsafe_mutation() {
    {
      const error = new Error(`state_unsafe_mutation
Updating state inside a derived or a template expression is forbidden. If the value should not be reactive, declare it without \`$state\``);
      error.name = "Svelte error";
      throw error;
    }
  }
  let legacy_mode_flag = false;
  let inspect_effects = /* @__PURE__ */ new Set();
  function set_inspect_effects(v) {
    inspect_effects = v;
  }
  function source(v) {
    return {
      f: 0,
      // TODO ideally we could skip this altogether, but it causes type errors
      v,
      reactions: null,
      equals,
      version: 0
    };
  }
  function state$1(v) {
    return /* @__PURE__ */ push_derived_source(source(v));
  }
  // @__NO_SIDE_EFFECTS__
  function push_derived_source(source2) {
    if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
      if (derived_sources === null) {
        set_derived_sources([source2]);
      } else {
        derived_sources.push(source2);
      }
    }
    return source2;
  }
  function set(source2, value) {
    if (active_reaction !== null && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT)) !== 0 && // If the source was created locally within the current derived, then
    // we allow the mutation.
    (derived_sources === null || !derived_sources.includes(source2))) {
      state_unsafe_mutation();
    }
    return internal_set(source2, value);
  }
  function internal_set(source2, value) {
    if (!source2.equals(value)) {
      source2.v = value;
      source2.version = increment_version();
      mark_reactions(source2, DIRTY);
      if (active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & BRANCH_EFFECT) === 0) {
        if (new_deps !== null && new_deps.includes(source2)) {
          set_signal_status(active_effect, DIRTY);
          schedule_effect(active_effect);
        } else {
          if (untracked_writes === null) {
            set_untracked_writes([source2]);
          } else {
            untracked_writes.push(source2);
          }
        }
      }
      if (inspect_effects.size > 0) {
        const inspects = Array.from(inspect_effects);
        var previously_flushing_effect = is_flushing_effect;
        set_is_flushing_effect(true);
        try {
          for (const effect2 of inspects) {
            if ((effect2.f & CLEAN) !== 0) {
              set_signal_status(effect2, MAYBE_DIRTY);
            }
            if (check_dirtiness(effect2)) {
              update_effect(effect2);
            }
          }
        } finally {
          set_is_flushing_effect(previously_flushing_effect);
        }
        inspect_effects.clear();
      }
    }
    return value;
  }
  function mark_reactions(signal, status) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    var length = reactions.length;
    for (var i = 0; i < length; i++) {
      var reaction = reactions[i];
      var flags = reaction.f;
      if ((flags & DIRTY) !== 0) continue;
      if ((flags & INSPECT_EFFECT) !== 0) {
        inspect_effects.add(reaction);
        continue;
      }
      set_signal_status(reaction, status);
      if ((flags & (CLEAN | UNOWNED)) !== 0) {
        if ((flags & DERIVED) !== 0) {
          mark_reactions(
            /** @type {Derived} */
            reaction,
            MAYBE_DIRTY
          );
        } else {
          schedule_effect(
            /** @type {Effect} */
            reaction
          );
        }
      }
    }
  }
  function destroy_derived_children(derived) {
    var children = derived.children;
    if (children !== null) {
      derived.children = null;
      for (var i = 0; i < children.length; i += 1) {
        var child2 = children[i];
        if ((child2.f & DERIVED) !== 0) {
          destroy_derived(
            /** @type {Derived} */
            child2
          );
        } else {
          destroy_effect(
            /** @type {Effect} */
            child2
          );
        }
      }
    }
  }
  let stack = [];
  function execute_derived(derived) {
    var value;
    var prev_active_effect = active_effect;
    set_active_effect(derived.parent);
    {
      let prev_inspect_effects = inspect_effects;
      set_inspect_effects(/* @__PURE__ */ new Set());
      try {
        if (stack.includes(derived)) {
          derived_references_self();
        }
        stack.push(derived);
        destroy_derived_children(derived);
        value = update_reaction(derived);
      } finally {
        set_active_effect(prev_active_effect);
        set_inspect_effects(prev_inspect_effects);
        stack.pop();
      }
    }
    return value;
  }
  function update_derived(derived) {
    var value = execute_derived(derived);
    var status = (skip_reaction || (derived.f & UNOWNED) !== 0) && derived.deps !== null ? MAYBE_DIRTY : CLEAN;
    set_signal_status(derived, status);
    if (!derived.equals(value)) {
      derived.v = value;
      derived.version = increment_version();
    }
  }
  function destroy_derived(signal) {
    destroy_derived_children(signal);
    remove_reactions(signal, 0);
    set_signal_status(signal, DESTROYED);
    signal.v = signal.children = signal.deps = signal.ctx = signal.reactions = null;
  }
  function push_effect(effect2, parent_effect) {
    var parent_last = parent_effect.last;
    if (parent_last === null) {
      parent_effect.last = parent_effect.first = effect2;
    } else {
      parent_last.next = effect2;
      effect2.prev = parent_last;
      parent_effect.last = effect2;
    }
  }
  function create_effect(type, fn, sync, push2 = true) {
    var is_root = (type & ROOT_EFFECT) !== 0;
    var parent_effect = active_effect;
    {
      while (parent_effect !== null && (parent_effect.f & INSPECT_EFFECT) !== 0) {
        parent_effect = parent_effect.parent;
      }
    }
    var effect2 = {
      ctx: component_context,
      deps: null,
      deriveds: null,
      nodes_start: null,
      nodes_end: null,
      f: type | DIRTY,
      first: null,
      fn,
      last: null,
      next: null,
      parent: is_root ? null : parent_effect,
      prev: null,
      teardown: null,
      transitions: null,
      version: 0
    };
    {
      effect2.component_function = dev_current_component_function;
    }
    if (sync) {
      var previously_flushing_effect = is_flushing_effect;
      try {
        set_is_flushing_effect(true);
        update_effect(effect2);
        effect2.f |= EFFECT_RAN;
      } catch (e) {
        destroy_effect(effect2);
        throw e;
      } finally {
        set_is_flushing_effect(previously_flushing_effect);
      }
    } else if (fn !== null) {
      schedule_effect(effect2);
    }
    var inert = sync && effect2.deps === null && effect2.first === null && effect2.nodes_start === null && effect2.teardown === null && (effect2.f & EFFECT_HAS_DERIVED) === 0;
    if (!inert && !is_root && push2) {
      if (parent_effect !== null) {
        push_effect(effect2, parent_effect);
      }
      if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
        var derived = (
          /** @type {Derived} */
          active_reaction
        );
        (derived.children ?? (derived.children = [])).push(effect2);
      }
    }
    return effect2;
  }
  function teardown(fn) {
    const effect2 = create_effect(RENDER_EFFECT, null, false);
    set_signal_status(effect2, CLEAN);
    effect2.teardown = fn;
    return effect2;
  }
  function effect_root(fn) {
    const effect2 = create_effect(ROOT_EFFECT, fn, true);
    return () => {
      destroy_effect(effect2);
    };
  }
  function effect(fn) {
    return create_effect(EFFECT, fn, false);
  }
  function template_effect(fn) {
    {
      define_property(fn, "name", {
        value: "{expression}"
      });
    }
    return block(fn);
  }
  function block(fn, flags = 0) {
    return create_effect(RENDER_EFFECT | BLOCK_EFFECT | flags, fn, true);
  }
  function branch(fn, push2 = true) {
    return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push2);
  }
  function execute_effect_teardown(effect2) {
    var teardown2 = effect2.teardown;
    if (teardown2 !== null) {
      const previous_reaction = active_reaction;
      set_active_reaction(null);
      try {
        teardown2.call(null);
      } finally {
        set_active_reaction(previous_reaction);
      }
    }
  }
  function destroy_effect_deriveds(signal) {
    var deriveds = signal.deriveds;
    if (deriveds !== null) {
      signal.deriveds = null;
      for (var i = 0; i < deriveds.length; i += 1) {
        destroy_derived(deriveds[i]);
      }
    }
  }
  function destroy_effect_children(signal, remove_dom = false) {
    var effect2 = signal.first;
    signal.first = signal.last = null;
    while (effect2 !== null) {
      var next = effect2.next;
      destroy_effect(effect2, remove_dom);
      effect2 = next;
    }
  }
  function destroy_block_effect_children(signal) {
    var effect2 = signal.first;
    while (effect2 !== null) {
      var next = effect2.next;
      if ((effect2.f & BRANCH_EFFECT) === 0) {
        destroy_effect(effect2);
      }
      effect2 = next;
    }
  }
  function destroy_effect(effect2, remove_dom = true) {
    var removed = false;
    if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes_start !== null) {
      var node = effect2.nodes_start;
      var end = effect2.nodes_end;
      while (node !== null) {
        var next = node === end ? null : (
          /** @type {TemplateNode} */
          /* @__PURE__ */ get_next_sibling(node)
        );
        node.remove();
        node = next;
      }
      removed = true;
    }
    destroy_effect_children(effect2, remove_dom && !removed);
    destroy_effect_deriveds(effect2);
    remove_reactions(effect2, 0);
    set_signal_status(effect2, DESTROYED);
    var transitions = effect2.transitions;
    if (transitions !== null) {
      for (const transition of transitions) {
        transition.stop();
      }
    }
    execute_effect_teardown(effect2);
    var parent = effect2.parent;
    if (parent !== null && parent.first !== null) {
      unlink_effect(effect2);
    }
    {
      effect2.component_function = null;
    }
    effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.parent = effect2.fn = effect2.nodes_start = effect2.nodes_end = null;
  }
  function unlink_effect(effect2) {
    var parent = effect2.parent;
    var prev = effect2.prev;
    var next = effect2.next;
    if (prev !== null) prev.next = next;
    if (next !== null) next.prev = prev;
    if (parent !== null) {
      if (parent.first === effect2) parent.first = next;
      if (parent.last === effect2) parent.last = prev;
    }
  }
  const boundaries = {};
  const chrome_pattern = /at (?:.+ \()?(.+):(\d+):(\d+)\)?$/;
  const firefox_pattern = /@(.+):(\d+):(\d+)$/;
  function get_stack() {
    const stack2 = new Error().stack;
    if (!stack2) return null;
    const entries = [];
    for (const line of stack2.split("\n")) {
      let match = chrome_pattern.exec(line) ?? firefox_pattern.exec(line);
      if (match) {
        entries.push({
          file: match[1],
          line: +match[2],
          column: +match[3]
        });
      }
    }
    return entries;
  }
  function get_component() {
    var _a;
    const stack2 = (_a = get_stack()) == null ? void 0 : _a.slice(4);
    if (!stack2) return null;
    for (let i = 0; i < stack2.length; i++) {
      const entry = stack2[i];
      const modules = boundaries[entry.file];
      if (!modules) {
        if (i === 0) return null;
        continue;
      }
      for (const module of modules) {
        if (module.end == null) {
          return null;
        }
        if (module.start.line < entry.line && module.end.line > entry.line) {
          return module.component;
        }
      }
    }
    return null;
  }
  function mark_module_start() {
    var _a, _b;
    const start = (_a = get_stack()) == null ? void 0 : _a[2];
    if (start) {
      (boundaries[_b = start.file] ?? (boundaries[_b] = [])).push({
        start,
        // @ts-expect-error
        end: null,
        // @ts-expect-error we add the component at the end, since HMR will overwrite the function
        component: null
      });
    }
  }
  function mark_module_end(component) {
    var _a;
    const end = (_a = get_stack()) == null ? void 0 : _a[2];
    if (end) {
      const boundaries_file = boundaries[end.file];
      const boundary = boundaries_file[boundaries_file.length - 1];
      boundary.end = end;
      boundary.component = component;
    }
  }
  function widen_ownership(from, to) {
    if (to.owners === null) {
      return;
    }
    while (from) {
      if (from.owners === null) {
        to.owners = null;
        break;
      }
      for (const owner of from.owners) {
        to.owners.add(owner);
      }
      from = from.parent;
    }
  }
  function has_owner(metadata, component) {
    if (metadata.owners === null) {
      return true;
    }
    return metadata.owners.has(component) || metadata.parent !== null && has_owner(metadata.parent, component);
  }
  function get_owner(metadata) {
    var _a;
    return ((_a = metadata == null ? void 0 : metadata.owners) == null ? void 0 : _a.values().next().value) ?? get_owner(
      /** @type {ProxyMetadata} */
      metadata.parent
    );
  }
  function check_ownership(metadata) {
    const component = get_component();
    if (component && !has_owner(metadata, component)) {
      let original = get_owner(metadata);
      if (original[FILENAME] !== component[FILENAME]) {
        ownership_invalid_mutation(component[FILENAME], original[FILENAME]);
      } else {
        ownership_invalid_mutation();
      }
    }
  }
  const handled_errors = /* @__PURE__ */ new WeakSet();
  let is_micro_task_queued = false;
  let is_flushing_effect = false;
  function set_is_flushing_effect(value) {
    is_flushing_effect = value;
  }
  let queued_root_effects = [];
  let flush_count = 0;
  let dev_effect_stack = [];
  let active_reaction = null;
  function set_active_reaction(reaction) {
    active_reaction = reaction;
  }
  let active_effect = null;
  function set_active_effect(effect2) {
    active_effect = effect2;
  }
  let derived_sources = null;
  function set_derived_sources(sources) {
    derived_sources = sources;
  }
  let new_deps = null;
  let skipped_deps = 0;
  let untracked_writes = null;
  function set_untracked_writes(value) {
    untracked_writes = value;
  }
  let current_version = 0;
  let skip_reaction = false;
  let component_context = null;
  let dev_current_component_function = null;
  function increment_version() {
    return ++current_version;
  }
  function is_runes() {
    return !legacy_mode_flag;
  }
  function check_dirtiness(reaction) {
    var _a, _b;
    var flags = reaction.f;
    if ((flags & DIRTY) !== 0) {
      return true;
    }
    if ((flags & MAYBE_DIRTY) !== 0) {
      var dependencies = reaction.deps;
      var is_unowned = (flags & UNOWNED) !== 0;
      if (dependencies !== null) {
        var i;
        if ((flags & DISCONNECTED) !== 0) {
          for (i = 0; i < dependencies.length; i++) {
            ((_a = dependencies[i]).reactions ?? (_a.reactions = [])).push(reaction);
          }
          reaction.f ^= DISCONNECTED;
        }
        for (i = 0; i < dependencies.length; i++) {
          var dependency = dependencies[i];
          if (check_dirtiness(
            /** @type {Derived} */
            dependency
          )) {
            update_derived(
              /** @type {Derived} */
              dependency
            );
          }
          if (is_unowned && active_effect !== null && !skip_reaction && !((_b = dependency == null ? void 0 : dependency.reactions) == null ? void 0 : _b.includes(reaction))) {
            (dependency.reactions ?? (dependency.reactions = [])).push(reaction);
          }
          if (dependency.version > reaction.version) {
            return true;
          }
        }
      }
      if (!is_unowned) {
        set_signal_status(reaction, CLEAN);
      }
    }
    return false;
  }
  function handle_error(error, effect2, component_context2) {
    var _a, _b;
    if (handled_errors.has(error) || component_context2 === null) {
      throw error;
    }
    const component_stack = [];
    const effect_name = (_a = effect2.fn) == null ? void 0 : _a.name;
    if (effect_name) {
      component_stack.push(effect_name);
    }
    let current_context = component_context2;
    while (current_context !== null) {
      {
        var filename = (_b = current_context.function) == null ? void 0 : _b[FILENAME];
        if (filename) {
          const file = filename.split("/").pop();
          component_stack.push(file);
        }
      }
      current_context = current_context.p;
    }
    const indent = /Firefox/.test(navigator.userAgent) ? "  " : "	";
    define_property(error, "message", {
      value: error.message + `
${component_stack.map((name) => `
${indent}in ${name}`).join("")}
`
    });
    const stack2 = error.stack;
    if (stack2) {
      const lines = stack2.split("\n");
      const new_lines = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes("svelte/src/internal")) {
          continue;
        }
        new_lines.push(line);
      }
      define_property(error, "stack", {
        value: error.stack + new_lines.join("\n")
      });
    }
    handled_errors.add(error);
    throw error;
  }
  function update_reaction(reaction) {
    var _a;
    var previous_deps = new_deps;
    var previous_skipped_deps = skipped_deps;
    var previous_untracked_writes = untracked_writes;
    var previous_reaction = active_reaction;
    var previous_skip_reaction = skip_reaction;
    var prev_derived_sources = derived_sources;
    var previous_component_context = component_context;
    var flags = reaction.f;
    new_deps = /** @type {null | Value[]} */
    null;
    skipped_deps = 0;
    untracked_writes = null;
    active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
    skip_reaction = !is_flushing_effect && (flags & UNOWNED) !== 0;
    derived_sources = null;
    component_context = reaction.ctx;
    try {
      var result = (
        /** @type {Function} */
        (0, reaction.fn)()
      );
      var deps = reaction.deps;
      if (new_deps !== null) {
        var i;
        remove_reactions(reaction, skipped_deps);
        if (deps !== null && skipped_deps > 0) {
          deps.length = skipped_deps + new_deps.length;
          for (i = 0; i < new_deps.length; i++) {
            deps[skipped_deps + i] = new_deps[i];
          }
        } else {
          reaction.deps = deps = new_deps;
        }
        if (!skip_reaction) {
          for (i = skipped_deps; i < deps.length; i++) {
            ((_a = deps[i]).reactions ?? (_a.reactions = [])).push(reaction);
          }
        }
      } else if (deps !== null && skipped_deps < deps.length) {
        remove_reactions(reaction, skipped_deps);
        deps.length = skipped_deps;
      }
      return result;
    } finally {
      new_deps = previous_deps;
      skipped_deps = previous_skipped_deps;
      untracked_writes = previous_untracked_writes;
      active_reaction = previous_reaction;
      skip_reaction = previous_skip_reaction;
      derived_sources = prev_derived_sources;
      component_context = previous_component_context;
    }
  }
  function remove_reaction(signal, dependency) {
    let reactions = dependency.reactions;
    if (reactions !== null) {
      var index = reactions.indexOf(signal);
      if (index !== -1) {
        var new_length = reactions.length - 1;
        if (new_length === 0) {
          reactions = dependency.reactions = null;
        } else {
          reactions[index] = reactions[new_length];
          reactions.pop();
        }
      }
    }
    if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
    // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
    // allows us to skip the expensive work of disconnecting and immediately reconnecting it
    (new_deps === null || !new_deps.includes(dependency))) {
      set_signal_status(dependency, MAYBE_DIRTY);
      if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
        dependency.f ^= DISCONNECTED;
      }
      remove_reactions(
        /** @type {Derived} **/
        dependency,
        0
      );
    }
  }
  function remove_reactions(signal, start_index) {
    var dependencies = signal.deps;
    if (dependencies === null) return;
    for (var i = start_index; i < dependencies.length; i++) {
      remove_reaction(signal, dependencies[i]);
    }
  }
  function update_effect(effect2) {
    var flags = effect2.f;
    if ((flags & DESTROYED) !== 0) {
      return;
    }
    set_signal_status(effect2, CLEAN);
    var previous_effect = active_effect;
    var previous_component_context = component_context;
    active_effect = effect2;
    {
      var previous_component_fn = dev_current_component_function;
      dev_current_component_function = effect2.component_function;
    }
    try {
      if ((flags & BLOCK_EFFECT) !== 0) {
        destroy_block_effect_children(effect2);
      } else {
        destroy_effect_children(effect2);
      }
      destroy_effect_deriveds(effect2);
      execute_effect_teardown(effect2);
      var teardown2 = update_reaction(effect2);
      effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
      effect2.version = current_version;
      if (DEV) {
        dev_effect_stack.push(effect2);
      }
    } catch (error) {
      handle_error(
        /** @type {Error} */
        error,
        effect2,
        previous_component_context
      );
    } finally {
      active_effect = previous_effect;
      {
        dev_current_component_function = previous_component_fn;
      }
    }
  }
  function infinite_loop_guard() {
    if (flush_count > 1e3) {
      flush_count = 0;
      {
        try {
          effect_update_depth_exceeded();
        } catch (error) {
          define_property(error, "stack", {
            value: ""
          });
          console.error(
            "Last ten effects were: ",
            dev_effect_stack.slice(-10).map((d) => d.fn)
          );
          dev_effect_stack = [];
          throw error;
        }
      }
    }
    flush_count++;
  }
  function flush_queued_root_effects(root_effects) {
    var length = root_effects.length;
    if (length === 0) {
      return;
    }
    infinite_loop_guard();
    var previously_flushing_effect = is_flushing_effect;
    is_flushing_effect = true;
    try {
      for (var i = 0; i < length; i++) {
        var effect2 = root_effects[i];
        if ((effect2.f & CLEAN) === 0) {
          effect2.f ^= CLEAN;
        }
        var collected_effects = [];
        process_effects(effect2, collected_effects);
        flush_queued_effects(collected_effects);
      }
    } finally {
      is_flushing_effect = previously_flushing_effect;
    }
  }
  function flush_queued_effects(effects) {
    var length = effects.length;
    if (length === 0) return;
    for (var i = 0; i < length; i++) {
      var effect2 = effects[i];
      if ((effect2.f & (DESTROYED | INERT)) === 0 && check_dirtiness(effect2)) {
        update_effect(effect2);
        if (effect2.deps === null && effect2.first === null && effect2.nodes_start === null) {
          if (effect2.teardown === null) {
            unlink_effect(effect2);
          } else {
            effect2.fn = null;
          }
        }
      }
    }
  }
  function process_deferred() {
    is_micro_task_queued = false;
    if (flush_count > 1001) {
      return;
    }
    const previous_queued_root_effects = queued_root_effects;
    queued_root_effects = [];
    flush_queued_root_effects(previous_queued_root_effects);
    if (!is_micro_task_queued) {
      flush_count = 0;
      {
        dev_effect_stack = [];
      }
    }
  }
  function schedule_effect(signal) {
    {
      if (!is_micro_task_queued) {
        is_micro_task_queued = true;
        queueMicrotask(process_deferred);
      }
    }
    var effect2 = signal;
    while (effect2.parent !== null) {
      effect2 = effect2.parent;
      var flags = effect2.f;
      if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
        if ((flags & CLEAN) === 0) return;
        effect2.f ^= CLEAN;
      }
    }
    queued_root_effects.push(effect2);
  }
  function process_effects(effect2, collected_effects) {
    var current_effect = effect2.first;
    var effects = [];
    main_loop: while (current_effect !== null) {
      var flags = current_effect.f;
      var is_branch = (flags & BRANCH_EFFECT) !== 0;
      var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
      if (!is_skippable_branch && (flags & INERT) === 0) {
        if ((flags & RENDER_EFFECT) !== 0) {
          if (is_branch) {
            current_effect.f ^= CLEAN;
          } else if (check_dirtiness(current_effect)) {
            update_effect(current_effect);
          }
          var child2 = current_effect.first;
          if (child2 !== null) {
            current_effect = child2;
            continue;
          }
        } else if ((flags & EFFECT) !== 0) {
          effects.push(current_effect);
        }
      }
      var sibling = current_effect.next;
      if (sibling === null) {
        let parent = current_effect.parent;
        while (parent !== null) {
          if (effect2 === parent) {
            break main_loop;
          }
          var parent_sibling = parent.next;
          if (parent_sibling !== null) {
            current_effect = parent_sibling;
            continue main_loop;
          }
          parent = parent.parent;
        }
      }
      current_effect = sibling;
    }
    for (var i = 0; i < effects.length; i++) {
      child2 = effects[i];
      collected_effects.push(child2);
      process_effects(child2, collected_effects);
    }
  }
  function get(signal) {
    var _a;
    var flags = signal.f;
    var is_derived = (flags & DERIVED) !== 0;
    if (is_derived && (flags & DESTROYED) !== 0) {
      var value = execute_derived(
        /** @type {Derived} */
        signal
      );
      destroy_derived(
        /** @type {Derived} */
        signal
      );
      return value;
    }
    if (active_reaction !== null) {
      if (derived_sources !== null && derived_sources.includes(signal)) {
        state_unsafe_local_read();
      }
      var deps = active_reaction.deps;
      if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
        skipped_deps++;
      } else if (new_deps === null) {
        new_deps = [signal];
      } else {
        new_deps.push(signal);
      }
      if (untracked_writes !== null && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & BRANCH_EFFECT) === 0 && untracked_writes.includes(signal)) {
        set_signal_status(active_effect, DIRTY);
        schedule_effect(active_effect);
      }
    } else if (is_derived && /** @type {Derived} */
    signal.deps === null) {
      var derived = (
        /** @type {Derived} */
        signal
      );
      var parent = derived.parent;
      if (parent !== null && !((_a = parent.deriveds) == null ? void 0 : _a.includes(derived))) {
        (parent.deriveds ?? (parent.deriveds = [])).push(derived);
      }
    }
    if (is_derived) {
      derived = /** @type {Derived} */
      signal;
      if (check_dirtiness(derived)) {
        update_derived(derived);
      }
    }
    return signal.v;
  }
  const STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
  function set_signal_status(signal, status) {
    signal.f = signal.f & STATUS_MASK | status;
  }
  function push(props, runes = false, fn) {
    component_context = {
      p: component_context,
      c: null,
      e: null,
      m: false,
      s: props,
      x: null,
      l: null
    };
    {
      component_context.function = fn;
      dev_current_component_function = fn;
    }
  }
  function pop(component) {
    var _a;
    const context_stack_item = component_context;
    if (context_stack_item !== null) {
      if (component !== void 0) {
        context_stack_item.x = component;
      }
      const component_effects = context_stack_item.e;
      if (component_effects !== null) {
        var previous_effect = active_effect;
        var previous_reaction = active_reaction;
        context_stack_item.e = null;
        try {
          for (var i = 0; i < component_effects.length; i++) {
            var component_effect = component_effects[i];
            set_active_effect(component_effect.effect);
            set_active_reaction(component_effect.reaction);
            effect(component_effect.fn);
          }
        } finally {
          set_active_effect(previous_effect);
          set_active_reaction(previous_reaction);
        }
      }
      component_context = context_stack_item.p;
      {
        dev_current_component_function = ((_a = context_stack_item.p) == null ? void 0 : _a.function) ?? null;
      }
      context_stack_item.m = true;
    }
    return component || /** @type {T} */
    {};
  }
  {
    let throw_rune_error = function(rune) {
      if (!(rune in globalThis)) {
        let value;
        Object.defineProperty(globalThis, rune, {
          configurable: true,
          // eslint-disable-next-line getter-return
          get: () => {
            if (value !== void 0) {
              return value;
            }
            rune_outside_svelte(rune);
          },
          set: (v) => {
            value = v;
          }
        });
      }
    };
    throw_rune_error("$state");
    throw_rune_error("$effect");
    throw_rune_error("$derived");
    throw_rune_error("$inspect");
    throw_rune_error("$props");
    throw_rune_error("$bindable");
  }
  function proxy(value, parent = null, prev) {
    var _a, _b;
    if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
      return value;
    }
    const prototype = get_prototype_of(value);
    if (prototype !== object_prototype && prototype !== array_prototype) {
      return value;
    }
    var sources = /* @__PURE__ */ new Map();
    var is_proxied_array = is_array(value);
    var version = source(0);
    if (is_proxied_array) {
      sources.set("length", source(
        /** @type {any[]} */
        value.length
      ));
    }
    var metadata;
    {
      metadata = {
        parent,
        owners: null
      };
      if (prev) {
        const prev_owners = (_b = (_a = prev.v) == null ? void 0 : _a[STATE_SYMBOL_METADATA]) == null ? void 0 : _b.owners;
        metadata.owners = prev_owners ? new Set(prev_owners) : null;
      } else {
        metadata.owners = parent === null ? component_context !== null ? /* @__PURE__ */ new Set([component_context.function]) : null : /* @__PURE__ */ new Set();
      }
    }
    return new Proxy(
      /** @type {any} */
      value,
      {
        defineProperty(_, prop, descriptor) {
          if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
            state_descriptors_fixed();
          }
          var s = sources.get(prop);
          if (s === void 0) {
            s = source(descriptor.value);
            sources.set(prop, s);
          } else {
            set(s, proxy(descriptor.value, metadata));
          }
          return true;
        },
        deleteProperty(target, prop) {
          var s = sources.get(prop);
          if (s === void 0) {
            if (prop in target) {
              sources.set(prop, source(UNINITIALIZED));
            }
          } else {
            if (is_proxied_array && typeof prop === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop);
              if (Number.isInteger(n) && n < ls.v) {
                set(ls, n);
              }
            }
            set(s, UNINITIALIZED);
            update_version(version);
          }
          return true;
        },
        get(target, prop, receiver) {
          var _a2;
          if (prop === STATE_SYMBOL_METADATA) {
            return metadata;
          }
          if (prop === STATE_SYMBOL) {
            return value;
          }
          var s = sources.get(prop);
          var exists = prop in target;
          if (s === void 0 && (!exists || ((_a2 = get_descriptor(target, prop)) == null ? void 0 : _a2.writable))) {
            s = source(proxy(exists ? target[prop] : UNINITIALIZED, metadata));
            sources.set(prop, s);
          }
          if (s !== void 0) {
            var v = get(s);
            {
              var prop_metadata = v == null ? void 0 : v[STATE_SYMBOL_METADATA];
              if (prop_metadata && (prop_metadata == null ? void 0 : prop_metadata.parent) !== metadata) {
                widen_ownership(metadata, prop_metadata);
              }
            }
            return v === UNINITIALIZED ? void 0 : v;
          }
          return Reflect.get(target, prop, receiver);
        },
        getOwnPropertyDescriptor(target, prop) {
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
          if (descriptor && "value" in descriptor) {
            var s = sources.get(prop);
            if (s) descriptor.value = get(s);
          } else if (descriptor === void 0) {
            var source2 = sources.get(prop);
            var value2 = source2 == null ? void 0 : source2.v;
            if (source2 !== void 0 && value2 !== UNINITIALIZED) {
              return {
                enumerable: true,
                configurable: true,
                value: value2,
                writable: true
              };
            }
          }
          return descriptor;
        },
        has(target, prop) {
          var _a2;
          if (prop === STATE_SYMBOL_METADATA) {
            return true;
          }
          if (prop === STATE_SYMBOL) {
            return true;
          }
          var s = sources.get(prop);
          var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop);
          if (s !== void 0 || active_effect !== null && (!has || ((_a2 = get_descriptor(target, prop)) == null ? void 0 : _a2.writable))) {
            if (s === void 0) {
              s = source(has ? proxy(target[prop], metadata) : UNINITIALIZED);
              sources.set(prop, s);
            }
            var value2 = get(s);
            if (value2 === UNINITIALIZED) {
              return false;
            }
          }
          return has;
        },
        set(target, prop, value2, receiver) {
          var _a2;
          var s = sources.get(prop);
          var has = prop in target;
          if (is_proxied_array && prop === "length") {
            for (var i = value2; i < /** @type {Source<number>} */
            s.v; i += 1) {
              var other_s = sources.get(i + "");
              if (other_s !== void 0) {
                set(other_s, UNINITIALIZED);
              } else if (i in target) {
                other_s = source(UNINITIALIZED);
                sources.set(i + "", other_s);
              }
            }
          }
          if (s === void 0) {
            if (!has || ((_a2 = get_descriptor(target, prop)) == null ? void 0 : _a2.writable)) {
              s = source(void 0);
              set(s, proxy(value2, metadata));
              sources.set(prop, s);
            }
          } else {
            has = s.v !== UNINITIALIZED;
            set(s, proxy(value2, metadata));
          }
          {
            var prop_metadata = value2 == null ? void 0 : value2[STATE_SYMBOL_METADATA];
            if (prop_metadata && (prop_metadata == null ? void 0 : prop_metadata.parent) !== metadata) {
              widen_ownership(metadata, prop_metadata);
            }
            check_ownership(metadata);
          }
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
          if (descriptor == null ? void 0 : descriptor.set) {
            descriptor.set.call(receiver, value2);
          }
          if (!has) {
            if (is_proxied_array && typeof prop === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop);
              if (Number.isInteger(n) && n >= ls.v) {
                set(ls, n + 1);
              }
            }
            update_version(version);
          }
          return true;
        },
        ownKeys(target) {
          get(version);
          var own_keys = Reflect.ownKeys(target).filter((key2) => {
            var source3 = sources.get(key2);
            return source3 === void 0 || source3.v !== UNINITIALIZED;
          });
          for (var [key, source2] of sources) {
            if (source2.v !== UNINITIALIZED && !(key in target)) {
              own_keys.push(key);
            }
          }
          return own_keys;
        },
        setPrototypeOf() {
          state_prototype_fixed();
        }
      }
    );
  }
  function update_version(signal, d = 1) {
    set(signal, signal.v + d);
  }
  function get_proxied_value(value) {
    if (value !== null && typeof value === "object" && STATE_SYMBOL in value) {
      return value[STATE_SYMBOL];
    }
    return value;
  }
  function init_array_prototype_warnings() {
    const array_prototype2 = Array.prototype;
    const cleanup = Array.__svelte_cleanup;
    if (cleanup) {
      cleanup();
    }
    const { indexOf, lastIndexOf, includes } = array_prototype2;
    array_prototype2.indexOf = function(item, from_index) {
      const index = indexOf.call(this, item, from_index);
      if (index === -1) {
        const test = indexOf.call(get_proxied_value(this), get_proxied_value(item), from_index);
        if (test !== -1) {
          state_proxy_equality_mismatch("array.indexOf(...)");
        }
      }
      return index;
    };
    array_prototype2.lastIndexOf = function(item, from_index) {
      const index = lastIndexOf.call(this, item, from_index ?? this.length - 1);
      if (index === -1) {
        const test = lastIndexOf.call(
          get_proxied_value(this),
          get_proxied_value(item),
          from_index ?? this.length - 1
        );
        if (test !== -1) {
          state_proxy_equality_mismatch("array.lastIndexOf(...)");
        }
      }
      return index;
    };
    array_prototype2.includes = function(item, from_index) {
      const has = includes.call(this, item, from_index);
      if (!has) {
        const test = includes.call(get_proxied_value(this), get_proxied_value(item), from_index);
        if (test) {
          state_proxy_equality_mismatch("array.includes(...)");
        }
      }
      return has;
    };
    Array.__svelte_cleanup = () => {
      array_prototype2.indexOf = indexOf;
      array_prototype2.lastIndexOf = lastIndexOf;
      array_prototype2.includes = includes;
    };
  }
  var $window;
  var first_child_getter;
  var next_sibling_getter;
  function init_operations() {
    if ($window !== void 0) {
      return;
    }
    $window = window;
    var element_prototype = Element.prototype;
    var node_prototype = Node.prototype;
    first_child_getter = get_descriptor(node_prototype, "firstChild").get;
    next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
    element_prototype.__click = void 0;
    element_prototype.__className = "";
    element_prototype.__attributes = null;
    element_prototype.__styles = null;
    element_prototype.__e = void 0;
    Text.prototype.__t = void 0;
    {
      element_prototype.__svelte_meta = null;
      init_array_prototype_warnings();
    }
  }
  function create_text(value = "") {
    return document.createTextNode(value);
  }
  // @__NO_SIDE_EFFECTS__
  function get_first_child(node) {
    return first_child_getter.call(node);
  }
  // @__NO_SIDE_EFFECTS__
  function get_next_sibling(node) {
    return next_sibling_getter.call(node);
  }
  function child(node, is_text) {
    {
      return /* @__PURE__ */ get_first_child(node);
    }
  }
  function add_locations(fn, filename, locations) {
    return (...args) => {
      const dom = fn(...args);
      var node = dom.nodeType === 11 ? dom.firstChild : dom;
      assign_locations(node, filename, locations);
      return dom;
    };
  }
  function assign_location(element, filename, location) {
    element.__svelte_meta = {
      loc: { file: filename, line: location[0], column: location[1] }
    };
    if (location[2]) {
      assign_locations(element.firstChild, filename, location[2]);
    }
  }
  function assign_locations(node, filename, locations) {
    var i = 0;
    while (node && i < locations.length) {
      if (node.nodeType === 1) {
        assign_location(
          /** @type {Element} */
          node,
          filename,
          locations[i++]
        );
      }
      node = node.nextSibling;
    }
  }
  function listen(target, events, handler, call_handler_immediately = true) {
    if (call_handler_immediately) {
      handler();
    }
    for (var name of events) {
      target.addEventListener(name, handler);
    }
    teardown(() => {
      for (var name2 of events) {
        target.removeEventListener(name2, handler);
      }
    });
  }
  function without_reactive_context(fn) {
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      return fn();
    } finally {
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  const all_registered_events = /* @__PURE__ */ new Set();
  const root_event_handles = /* @__PURE__ */ new Set();
  function handle_event_propagation(event) {
    var _a;
    var handler_element = this;
    var owner_document = (
      /** @type {Node} */
      handler_element.ownerDocument
    );
    var event_name = event.type;
    var path = ((_a = event.composedPath) == null ? void 0 : _a.call(event)) || [];
    var current_target = (
      /** @type {null | Element} */
      path[0] || event.target
    );
    var path_idx = 0;
    var handled_at = event.__root;
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
      window)) {
        event.__root = handler_element;
        return;
      }
      var handler_idx = path.indexOf(handler_element);
      if (handler_idx === -1) {
        return;
      }
      if (at_idx <= handler_idx) {
        path_idx = at_idx;
      }
    }
    current_target = /** @type {Element} */
    path[path_idx] || event.target;
    if (current_target === handler_element) return;
    define_property(event, "currentTarget", {
      configurable: true,
      get() {
        return current_target || owner_document;
      }
    });
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      var throw_error;
      var other_errors = [];
      while (current_target !== null) {
        var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
        current_target.host || null;
        try {
          var delegated = current_target["__" + event_name];
          if (delegated !== void 0 && !/** @type {any} */
          current_target.disabled) {
            if (is_array(delegated)) {
              var [fn, ...data2] = delegated;
              fn.apply(current_target, [event, ...data2]);
            } else {
              delegated.call(current_target, event);
            }
          }
        } catch (error) {
          if (throw_error) {
            other_errors.push(error);
          } else {
            throw_error = error;
          }
        }
        if (event.cancelBubble || parent_element === handler_element || parent_element === null) {
          break;
        }
        current_target = parent_element;
      }
      if (throw_error) {
        for (let error of other_errors) {
          queueMicrotask(() => {
            throw error;
          });
        }
        throw throw_error;
      }
    } finally {
      event.__root = handler_element;
      delete event.currentTarget;
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  function create_fragment_from_html(html) {
    var elem = document.createElement("template");
    elem.innerHTML = html;
    return elem.content;
  }
  function assign_nodes(start, end) {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if (effect2.nodes_start === null) {
      effect2.nodes_start = start;
      effect2.nodes_end = end;
    }
  }
  // @__NO_SIDE_EFFECTS__
  function ns_template(content, flags, ns = "svg") {
    var has_start = !content.startsWith("<!>");
    var wrapped = `<${ns}>${has_start ? content : "<!>" + content}</${ns}>`;
    var node;
    return () => {
      if (!node) {
        var fragment = (
          /** @type {DocumentFragment} */
          create_fragment_from_html(wrapped)
        );
        var root2 = (
          /** @type {Element} */
          /* @__PURE__ */ get_first_child(fragment)
        );
        {
          node = /** @type {Element} */
          /* @__PURE__ */ get_first_child(root2);
        }
      }
      var clone = (
        /** @type {TemplateNode} */
        node.cloneNode(true)
      );
      {
        assign_nodes(clone, clone);
      }
      return clone;
    };
  }
  function append(anchor, dom) {
    if (anchor === null) {
      return;
    }
    anchor.before(
      /** @type {Node} */
      dom
    );
  }
  const PASSIVE_EVENTS = ["touchstart", "touchmove"];
  function is_passive_event(name) {
    return PASSIVE_EVENTS.includes(name);
  }
  function mount(component, options) {
    return _mount(component, options);
  }
  const document_listeners = /* @__PURE__ */ new Map();
  function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
    init_operations();
    var registered_events = /* @__PURE__ */ new Set();
    var event_handle = (events2) => {
      for (var i = 0; i < events2.length; i++) {
        var event_name = events2[i];
        if (registered_events.has(event_name)) continue;
        registered_events.add(event_name);
        var passive = is_passive_event(event_name);
        target.addEventListener(event_name, handle_event_propagation, { passive });
        var n = document_listeners.get(event_name);
        if (n === void 0) {
          document.addEventListener(event_name, handle_event_propagation, { passive });
          document_listeners.set(event_name, 1);
        } else {
          document_listeners.set(event_name, n + 1);
        }
      }
    };
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    var component = void 0;
    var unmount = effect_root(() => {
      var anchor_node = anchor ?? target.appendChild(create_text());
      branch(() => {
        if (context) {
          push({});
          var ctx = (
            /** @type {ComponentContext} */
            component_context
          );
          ctx.c = context;
        }
        if (events) {
          props.$$events = events;
        }
        component = Component(anchor_node, props) || {};
        if (context) {
          pop();
        }
      });
      return () => {
        var _a;
        for (var event_name of registered_events) {
          target.removeEventListener(event_name, handle_event_propagation);
          var n = (
            /** @type {number} */
            document_listeners.get(event_name)
          );
          if (--n === 0) {
            document.removeEventListener(event_name, handle_event_propagation);
            document_listeners.delete(event_name);
          } else {
            document_listeners.set(event_name, n);
          }
        }
        root_event_handles.delete(event_handle);
        mounted_components.delete(component);
        if (anchor_node !== anchor) {
          (_a = anchor_node.parentNode) == null ? void 0 : _a.removeChild(anchor_node);
        }
      };
    });
    mounted_components.set(component, unmount);
    return component;
  }
  let mounted_components = /* @__PURE__ */ new WeakMap();
  function check_target(target) {
    if (target) {
      component_api_invalid_new(target[FILENAME] ?? "a component", target.name);
    }
  }
  function legacy_api() {
    const component = component_context == null ? void 0 : component_context.function;
    function error(method) {
      var _a;
      const parent = ((_a = get_component()) == null ? void 0 : _a[FILENAME]) ?? "Something";
      component_api_changed(parent, method, component[FILENAME]);
    }
    return {
      $destroy: () => error("$destroy()"),
      $on: () => error("$on(...)"),
      $set: () => error("$set(...)")
    };
  }
  function set_attribute(element, attribute, value, skip_warning) {
    var attributes = element.__attributes ?? (element.__attributes = {});
    if (attributes[attribute] === (attributes[attribute] = value)) return;
    if (attribute === "style" && "__styles" in element) {
      element.__styles = {};
    }
    if (attribute === "loading") {
      element[LOADING_ATTR_SYMBOL] = value;
    }
    if (value == null) {
      element.removeAttribute(attribute);
    } else if (typeof value !== "string" && get_setters(element).includes(attribute)) {
      element[attribute] = value;
    } else {
      element.setAttribute(attribute, value);
    }
  }
  var setters_cache = /* @__PURE__ */ new Map();
  function get_setters(element) {
    var setters = setters_cache.get(element.nodeName);
    if (setters) return setters;
    setters_cache.set(element.nodeName, setters = []);
    var descriptors;
    var proto = get_prototype_of(element);
    var element_proto = Element.prototype;
    while (element_proto !== proto) {
      descriptors = get_descriptors(proto);
      for (var key in descriptors) {
        if (descriptors[key].set) {
          setters.push(key);
        }
      }
      proto = get_prototype_of(proto);
    }
    return setters;
  }
  function bind_window_size(type, set2) {
    listen(window, ["resize"], () => without_reactive_context(() => set2(window[type])));
  }
  function validate_prop_bindings($$props, bindable, exports2, component) {
    var _a;
    for (const key in $$props) {
      var setter = (_a = get_descriptor($$props, key)) == null ? void 0 : _a.set;
      var name = component.name;
      if (setter) {
        if (exports2.includes(key)) {
          bind_invalid_export(component[FILENAME], key, name);
        }
        if (!bindable.includes(key)) {
          bind_not_bindable(key, component[FILENAME], name);
        }
      }
    }
  }
  const PUBLIC_VERSION = "5";
  if (typeof window !== "undefined")
    (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
  mark_module_start();
  Viz[FILENAME] = "src/Viz.svelte";
  var root = add_locations(/* @__PURE__ */ ns_template(`<svg><circle stroke="black"></circle></svg>`), Viz[FILENAME], [[9, 0, [[10, 2]]]]);
  function Viz($$anchor, $$props) {
    check_target(new.target);
    push($$props, true, Viz);
    validate_prop_bindings($$props, [], [], Viz);
    let width = state$1(500);
    let height = state$1(500);
    var svg = root();
    var circle = child(svg);
    template_effect(() => {
      set_attribute(svg, "width", get(width));
      set_attribute(svg, "height", get(height));
      set_attribute(circle, "cx", get(width) / 2);
      set_attribute(circle, "cy", get(height) / 2);
      set_attribute(circle, "r", $$props.radius);
      set_attribute(circle, "fill", $$props.color);
      set_attribute(circle, "stroke-width", $$props.stroke);
    });
    bind_window_size("innerWidth", ($$value) => set(width, proxy($$value, null, width)));
    bind_window_size("innerHeight", ($$value) => set(height, proxy($$value, null, height)));
    append($$anchor, svg);
    return pop({ ...legacy_api() });
  }
  mark_module_end(Viz);
  var data = {};
  var state = { radius: 50, stroke: 2, color: "#ffffff" };
  let reactiveState = state$1(proxy({}));
  function draw() {
    set(reactiveState, proxy({ ...state }, null, reactiveState));
    get(reactiveState).data = data;
    mount(Viz, {
      target: document.body,
      props: get(reactiveState)
      // Pass the reactive state to Svelte
    });
  }
  function update() {
    if (state.radius <= 0) throw new Error("Radius must be positive");
    Object.assign(get(reactiveState), state);
    get(reactiveState).data = data;
  }
  exports.data = data;
  exports.draw = draw;
  exports.state = state;
  exports.update = update;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
}({});
