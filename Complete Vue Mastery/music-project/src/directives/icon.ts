export default {
  beforeMount(element: Element, binding: any) {
    let iconClass = `fa fa-${binding.value}   text-xl`;
    if (binding.arg === "full") {
      iconClass = binding.value;
    }

    if (binding.modifiers.right) {
      iconClass += " float-right";
    }
    if (binding.modifiers.yellow) {
      iconClass += " text-yellow-400";
    } else {
      iconClass += " text-green-400";
    }
    element.innerHTML += `<!-- Icon -->
    <i
      class="${iconClass}"
    ></i>`;
  },
};
