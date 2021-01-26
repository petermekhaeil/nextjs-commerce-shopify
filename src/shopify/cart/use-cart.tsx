export function emptyHook() {
  return {
    data: {
      base_amount: 0,
      cart_amount: 0,
      currency: {
        code: '',
      },
      line_items: {
        physical_items: [
          {
            id: 0,
            url: '',
          },
        ],
      },
    },
    isEmpty: false,
  }
}

export default emptyHook
