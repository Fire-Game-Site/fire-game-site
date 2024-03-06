window.customElements.define(
	'fgs-popup',
	class popup extends HTMLElement {
		constructor() {
			super()
		}

		connectedCallback() {
			this.show = this.hasAttribute('show') ? this.getAttribute('show') : false
			this.title = this.getAttribute('title')
			this.desc = this.getAttribute('desc')

			if (!(document.cookie.includes('viewed=true')) && this.show === 'true') {
				document.body.style.overflow = 'hidden'
				this.style.position = 'absolute'
				this.style.width = '100%'
				this.style.height = '100%'
				this.style.background = 'rgba(0, 0, 0, 0.25)'
				this.style.display = 'flex'
				this.style.flexDirection = 'column'
				this.style.justifyContent = 'center'
				this.style.alignItems = 'center'
				this.innerHTML = `
					<div style="width: 50%; padding: 10px; gap: 10px; box-sizing: border-box; border-radius: 30px; background: #464646; border: 1px #FF0000 solid; position: relative;">
						<button onclick="document.cookie = 'viewed=true; SameSite=None; Secure'; this.parentElement.parentElement.style = 'display: none'; document.body.style.overflow = 'scroll'" style="position: absolute; top: 15px; right: 15px; background: none; border: none; padding: 0"><svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg></button>
						<p style="font-family: Poppins, system-ui; font-weight: 700; font-size: 24px; text-align: center; width: 100%; color: white">${this.title}</p>
						<p style="font-family: Poppins, system-ui; font-weight: 500; font-size: 14px; text-align: center; width: 100%; color: white">${this.desc}</p>
					</div>
				`
				this.style.overflow = 'show'
			}
		}
	}
)