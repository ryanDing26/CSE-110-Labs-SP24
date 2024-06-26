describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('https://elaine-ch.github.io/Lab6_Part1_Starter/');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    // Query select all of the <product-item> elements
    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        // Grab all of the json data stored inside
        return data = item.data;
      });
    });
    console.log(`Checking product item 1/${prodItemsData.length}`);
    // Make sure the title, price, and image are populated in the JSON
    firstValue = prodItemsData[0];
    if (firstValue.title.length == 0) { allArePopulated = false; }
    if (firstValue.price.length == 0) { allArePopulated = false; }
    if (firstValue.image.length == 0) { allArePopulated = false; }
    // Expect allArePopulated to still be true

    for (let i = 1; i < prodItemsData.length; i++) {
        value = prodItemsData[i];
        if (value.title.length == 0) { allArePopulated = false; }
        if (value.price.length == 0) { allArePopulated = false; }
        if (value.image.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
    // Done - Step 1
    // Right now this function is only checking the first <product-item> it found, make it so that
    // it checks every <product-item> it found

    // Changes: instead of just checking prodItemsData[0], it checks prodItemData[i] where i goes from 0 to prodItemsData.length-1.
  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    // TODO - Step 2
    // Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
    const prodItemData = await page.$('product-item');
    // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
    const shadowRoot = await prodItemData.getProperty("shadowRoot");
    // Once you have the button, you can click it and check the innerText property of the button.
    // Once you have the innerText property, use innerText.jsonValue() to get the text value of it
    const buttonText = await page.evaluate((shadowRoot) => {
        const button = shadowRoot.querySelector("button");
        button.click();
        return button.innerText;
    }, shadowRoot);
    
    expect(buttonText).toBe("Remove from Cart");

    // Reset the button for the next test, since the page remembers the cart.
    await page.evaluate((shadowRoot) => {
      const button = shadowRoot.querySelector("button");
      button.click();
      return button.innerText;
    }, shadowRoot);
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 3
    // Query select all of the <product-item> elements, then for every single product element
    const prodItems = await page.$$('product-item');
    let cartCounts = [];
    for (const prodItem of prodItems) {
      const shadowRoot = await prodItem.getProperty("shadowRoot");
      const cartCount = await page.evaluate((shadowRoot) => {
        const button = shadowRoot.querySelector("button");
        button.click();
        return document.getElementById("cart-count").innerText;
      }, shadowRoot);
      cartCounts.push(cartCount);
    }
    // get the shadowRoot and query select the button inside, and click on it.
    // Check to see if the innerText of #cart-count is 20
    expect(cartCounts[cartCounts.length-1]).toBe("20");
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 4
    // Reload the page, then select all of the <product-item> elements, and check every
    await page.reload();
    const prodItems = await page.$$('product-item');
    let cartCounts = [];
    // element to make sure that all of their buttons say "Remove from Cart".
    for (const prodItem of prodItems) {
      const shadowRoot = await prodItem.getProperty("shadowRoot");
      const checks = await page.evaluate((shadowRoot) => {
        const button = shadowRoot.querySelector("button");
        return [button.innerText, document.getElementById("cart-count").innerText];
      }, shadowRoot);
      expect(checks[0]).toBe("Remove from Cart");
      cartCounts.push(checks[1]);
    }
    // Also check to make sure that #cart-count is still 20
    expect(cartCounts[cartCounts.length-1]).toBe("20");
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    // TODO - Step 5
    // At this point the item 'cart' in localStorage should be 
    // '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
    const items = await page.evaluate(() => {
      return localStorage.getItem("cart");
    });
    expect(items).toBe("[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]");
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 6
    // Go through and click "Remove from Cart" on every single <product-item>, just like above.
    const prodItems = await page.$$('product-item');
    let cartCounts = [];
    for (const prodItem of prodItems) {
      const shadowRoot = await prodItem.getProperty("shadowRoot");
      const cartCount = await page.evaluate((shadowRoot) => {
        const button = shadowRoot.querySelector("button");
        button.click();
        return document.getElementById("cart-count").innerText;
      }, shadowRoot);
      cartCounts.push(cartCount);
    }
    // Once you have, check to make sure that #cart-count is now 0
    expect(cartCounts[cartCounts.length-1]).toBe("0");
  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 7
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    await page.reload();
    const prodItems = await page.$$('product-item');
    let cartCounts = [];
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    for (const prodItem of prodItems) {
      const shadowRoot = await prodItem.getProperty("shadowRoot");
      const checks = await page.evaluate((shadowRoot) => {
        const button = shadowRoot.querySelector("button");
        return [button.innerText, document.getElementById("cart-count").innerText];
      }, shadowRoot);
      expect(checks[0]).toBe("Add to Cart");
      cartCounts.push(checks[1]);
    }
    // Also check to make sure that #cart-count is still 0
    expect(cartCounts[cartCounts.length-1]).toBe("0");
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // TODO - Step 8
    // At this point the item 'cart' in localStorage should be '[]', check to make sure it is
    const items = await page.evaluate(() => {
      return localStorage.getItem("cart");
    });
    expect(items).toBe("[]");
  });
});
