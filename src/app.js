App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async() => {
    App.account = web3.eth.accounts[0]
    //console.log(App.account)
  },

  loadContract: async() => {
    // pull out the smart contract JSON file
    const memeList = await $.getJSON('Chain.json')
    // get TruffleContract
    App.contracts.Chain = TruffleContract(memeList)
    App.contracts.Chain.setProvider(App.web3Provider)
    console.log(memeList)

    // get smart contract values
    App.memeList = await App.contracts.Chain.deployed()
  },

  render: async() => {
    if (App.loading) {
      return
    }

    App.setLoading(true)

    $('#account').html(App.account)

    await App.renderTasks()

    App.setLoading(false)
  },

  renderTasks: async() => {
    const memeTotal = await App.memeList.memeTotal()
    const $memeTemplate = $('.memeTemplate')

    for (var i = 1; i <= memeTotal; i++) {
      const meme = await App.memeList.memes(i)
      const memeText = meme[0]
      const memeId = meme[1].toNumber()
      const memeUsername = meme[2]
      const memeTimestamp = meme[3]

      const $newMemeTemplate = $memeTemplate.clone()

      $newMemeTemplate.find('.memeTimestamp').html(memeTimestamp)
      $newMemeTemplate.find('.memeString').html(memeText)
      $newMemeTemplate.find('.memeUsername').html(memeUsername)
      //if (memeId == 0) {

      $newMemeTemplate.find('.memeIdImage').html(memeId)
      //}

      $('#memeList').append($newMemeTemplate)

      $newMemeTemplate.show()
    }
  },

  createMeme: async() => {
    App.setLoading(true)
    const string = $('#memeStr').val()
    const memeIdToEnter = $('#memeIdNo').val()
    let date = new Date()
    await App.memeList.createMeme(string, memeIdToEnter, App.account, date.toUTCString())
    window.location.reload()
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')

    // alternate between loader & content if loading
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }

}

// load app when the project loads
$(() => {
  $(window).load(() => {
    App.load()
  })
})
