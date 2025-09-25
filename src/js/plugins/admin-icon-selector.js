/**
 * Seletor de Ícones - JavaScript para o Painel Administrativo
 * Adaptado para funcionar dentro do WordPress Admin
 */

(function($) {
    'use strict';

    class IconSelector {
        constructor() {
            this.icons = [];
            this.filteredIcons = [];
            this.searchTerm = '';
            
            this.init();
        }

        async init() {
            await this.loadIcons();
            this.bindEvents();
            this.renderIcons();
            this.updateStats();
        }

        async loadIcons() {
            // Lista completa de todos os 1.030 ícones da pasta iconpdb
            const iconNames = [
                'iconpdb-24-support','iconpdb-3-dots-more','iconpdb-3d-cube-scan','iconpdb-3d-rotate','iconpdb-3d-square','iconpdb-3dcube','iconpdb-3square','iconpdb-aave-(aave)','iconpdb-activity','iconpdb-add-circle','iconpdb-add-item','iconpdb-add-square','iconpdb-add','iconpdb-ai-ac','iconpdb-ai-add','iconpdb-ai-antenna','iconpdb-ai-commentary','iconpdb-ai-fuel-tank','iconpdb-ai-heart-square','iconpdb-ai-homepage','iconpdb-ai-hospital','iconpdb-ai-housing','iconpdb-ai-landscape','iconpdb-ai-loveletter','iconpdb-ai-record-video','iconpdb-ai-sand-timer','iconpdb-ai-send-message','iconpdb-ai-shape-triangle','iconpdb-ai-syringe','iconpdb-ai-tag-price','iconpdb-ai-tools','iconpdb-ai-users','iconpdb-ai-water-cycle','iconpdb-ai-weight','iconpdb-airdrop','iconpdb-airplane-square','iconpdb-airplane','iconpdb-airpod','iconpdb-airpods','iconpdb-alarm','iconpdb-align-bottom','iconpdb-align-horizontally','iconpdb-align-left-2','iconpdb-align-left','iconpdb-align-right','iconpdb-align-top-2','iconpdb-align-top','iconpdb-align-vertically','iconpdb-android','iconpdb-ankr-ankr','iconpdb-apple','iconpdb-aquarius','iconpdb-archive-2','iconpdb-archive-3','iconpdb-archive-add','iconpdb-archive-book','iconpdb-archive-minus','iconpdb-archive-slash','iconpdb-archive-tick','iconpdb-archive','iconpdb-arrow-back','iconpdb-arrow-circle-down','iconpdb-arrow-circle-left','iconpdb-arrow-circle-right','iconpdb-arrow-circle-up','iconpdb-arrow-down-01','iconpdb-arrow-down-02','iconpdb-arrow-down-03','iconpdb-arrow-down-04','iconpdb-arrow-forward','iconpdb-arrow-left-01','iconpdb-arrow-left-02','iconpdb-arrow-left-03','iconpdb-arrow-left-04','iconpdb-arrow-right-01','iconpdb-arrow-right-02','iconpdb-arrow-right-03','iconpdb-arrow-right-04','iconpdb-arrow-square-down','iconpdb-arrow-square-left','iconpdb-arrow-square-right','iconpdb-arrow-square-up','iconpdb-arrow-square','iconpdb-arrow-swap-01','iconpdb-arrow-swap-02','iconpdb-arrow-swap-03','iconpdb-arrow-transfer-01','iconpdb-arrow-transfer-02','iconpdb-arrow-up-01','iconpdb-arrow-up-02','iconpdb-arrow-up-03','iconpdb-arrow-up-04','iconpdb-arrow','iconpdb-attach-circle','iconpdb-attach-square','iconpdb-audio-square','iconpdb-augur-(rep)','iconpdb-autobrightness','iconpdb-autonio-(niox)','iconpdb-avalanche-avax','iconpdb-award','iconpdb-backward-10-seconds','iconpdb-backward-15-seconds','iconpdb-backward-5-seconds','iconpdb-backward-item','iconpdb-backward','iconpdb-bag-2','iconpdb-bag-cross-1','iconpdb-bag-cross','iconpdb-bag-happy','iconpdb-bag-tick-2','iconpdb-bag-tick','iconpdb-bag-timer','iconpdb-bag','iconpdb-bank','iconpdb-barcode','iconpdb-battery-2bars','iconpdb-battery-charging','iconpdb-battery-disable','iconpdb-battery-empty-1','iconpdb-battery-empty','iconpdb-battery-full','iconpdb-behance','iconpdb-bezier','iconpdb-bill','iconpdb-binance-coin-(bnb)','iconpdb-binance-usd-(busd)','iconpdb-bitcoin-(btc)','iconpdb-bitcoin-card','iconpdb-bitcoin-convert','iconpdb-bitcoin-refresh','iconpdb-blend-2','iconpdb-blend','iconpdb-blogger','iconpdb-bluetooth-2','iconpdb-bluetooth-circle','iconpdb-bluetooth-rectangle','iconpdb-bluetooth','iconpdb-blur','iconpdb-book-open','iconpdb-book-saved','iconpdb-book-square','iconpdb-book','iconpdb-bookmark-2','iconpdb-bookmark','iconpdb-bootstrap','iconpdb-box-2-2','iconpdb-box-2','iconpdb-box-add','iconpdb-box-remove','iconpdb-box-search','iconpdb-box-tick','iconpdb-box-time','iconpdb-box','iconpdb-briefcase','iconpdb-brifecase-cross','iconpdb-brifecase-tick','iconpdb-brifecase-timer','iconpdb-broom','iconpdb-brush-square','iconpdb-brush','iconpdb-bubble','iconpdb-bucket-circle','iconpdb-bucket-square','iconpdb-bucket','iconpdb-building-3','iconpdb-building-4','iconpdb-building-5','iconpdb-building','iconpdb-buildings-2','iconpdb-buildings','iconpdb-bus','iconpdb-buy-crypto','iconpdb-cake','iconpdb-calculator','iconpdb-calendar-2','iconpdb-calendar-add','iconpdb-calendar-circle','iconpdb-calendar-date','iconpdb-calendar-edit','iconpdb-calendar-remove','iconpdb-calendar-search','iconpdb-calendar-tick','iconpdb-calendar','iconpdb-call-add','iconpdb-call-calling','iconpdb-call-incoming','iconpdb-call-minus','iconpdb-call-outgoing','iconpdb-call-received','iconpdb-call-remove','iconpdb-call-slash','iconpdb-call','iconpdb-camera-slash','iconpdb-camera','iconpdb-candle-2','iconpdb-candle','iconpdb-capsule','iconpdb-car','iconpdb-card-add','iconpdb-card-coin','iconpdb-card-edit','iconpdb-card-pos','iconpdb-card-receive','iconpdb-card-remove-1','iconpdb-card-remove','iconpdb-card-send','iconpdb-card-slash','iconpdb-card-tick-1','iconpdb-card-tick','iconpdb-card','iconpdb-cardano-(ada)','iconpdb-cards','iconpdb-category-2','iconpdb-category','iconpdb-cd','iconpdb-celo-(celo)','iconpdb-celsius-(cel)-','iconpdb-chainlink-(link)','iconpdb-chart-2','iconpdb-chart-3','iconpdb-chart-4','iconpdb-chart-fail','iconpdb-chart-square-2','iconpdb-chart-square','iconpdb-chart-success','iconpdb-chart','iconpdb-chatbox','iconpdb-check','iconpdb-chicken','iconpdb-chrome','iconpdb-civic-(cvc)','iconpdb-clipboard-close','iconpdb-clipboard-export','iconpdb-clipboard-import','iconpdb-clipboard-text','iconpdb-clipboard-tick','iconpdb-clipboard','iconpdb-clock-2','iconpdb-clock','iconpdb-close-circle','iconpdb-close-square','iconpdb-cloud-add','iconpdb-cloud-change','iconpdb-cloud-connection','iconpdb-cloud-cross','iconpdb-cloud-drizzle','iconpdb-cloud-fog','iconpdb-cloud-lightning','iconpdb-cloud-minus','iconpdb-cloud-notif','iconpdb-cloud-plus','iconpdb-cloud-remove','iconpdb-cloud-snow','iconpdb-cloud-sunny','iconpdb-cloud','iconpdb-code-1','iconpdb-code-circle','iconpdb-code','iconpdb-coffee','iconpdb-coin-1','iconpdb-coin','iconpdb-color-swatch','iconpdb-colorfilter','iconpdb-colors-square','iconpdb-command-square','iconpdb-command','iconpdb-component','iconpdb-computing','iconpdb-conversation-box','iconpdb-convert-3d-cube','iconpdb-convert-arrow','iconpdb-convert-card','iconpdb-convertshape-2','iconpdb-convertshape','iconpdb-copy-success','iconpdb-copy','iconpdb-copyright','iconpdb-courthouse','iconpdb-cow','iconpdb-cpu-charge','iconpdb-cpu-setting','iconpdb-cpu','iconpdb-creative-commons','iconpdb-crop','iconpdb-crown-1','iconpdb-crown','iconpdb-cup','iconpdb-dai-(dai)','iconpdb-danger','iconpdb-dash-dash','iconpdb-data-2','iconpdb-data','iconpdb-decred-(dcr)','iconpdb-dent-dental-care-oral-health-toothbrush-teeth-cleaning','iconpdb-designtools','iconpdb-device-message','iconpdb-devices-2','iconpdb-devices','iconpdb-diagram','iconpdb-diamonds','iconpdb-direct-down','iconpdb-direct-inbox','iconpdb-direct-left','iconpdb-direct-normal','iconpdb-direct-notification','iconpdb-direct-right','iconpdb-direct-send','iconpdb-direct-up','iconpdb-direct','iconpdb-directbox-default','iconpdb-directbox-notif','iconpdb-directbox-receive','iconpdb-directbox-send','iconpdb-discount-circle','iconpdb-discount-shape','iconpdb-discover-2','iconpdb-discover','iconpdb-dislike','iconpdb-document-2','iconpdb-document-cloud','iconpdb-document-code-2','iconpdb-document-code','iconpdb-document-copy','iconpdb-document-download','iconpdb-document-favorite','iconpdb-document-filter','iconpdb-document-forward','iconpdb-document-like','iconpdb-document-normal','iconpdb-document-previous','iconpdb-document-sketch','iconpdb-document-text-2','iconpdb-document-text','iconpdb-document-upload','iconpdb-document','iconpdb-dollar-circle','iconpdb-dollar-square','iconpdb-dribbble','iconpdb-driver-2','iconpdb-driver-refresh','iconpdb-driver','iconpdb-driving','iconpdb-drop','iconpdb-dropbox','iconpdb-edit-2','iconpdb-edit','iconpdb-educare-(ekt)','iconpdb-egg','iconpdb-electricity','iconpdb-emercoin-(emc)','iconpdb-emoji-happy','iconpdb-emoji-normal','iconpdb-emoji-sad','iconpdb-empty-wallet-add','iconpdb-empty-wallet-change','iconpdb-empty-wallet-remove','iconpdb-empty-wallet-tick','iconpdb-empty-wallet-time','iconpdb-empty-wallet','iconpdb-enhance-prize','iconpdb-enhance-user-ai','iconpdb-enjin-coin-(enj)','iconpdb-eos-(eos)','iconpdb-eraser-2','iconpdb-eraser','iconpdb-ethereum-(eth)','iconpdb-ethereum-classic-(etc)','iconpdb-export-arrow-01','iconpdb-export-arrow-02','iconpdb-export-circle-01','iconpdb-export-circle-02','iconpdb-external-drive','iconpdb-eye-slash','iconpdb-eye','iconpdb-facebook','iconpdb-favorite-chart','iconpdb-figma-circle','iconpdb-figma','iconpdb-filter-add','iconpdb-filter-edit','iconpdb-filter-remove','iconpdb-filter-search','iconpdb-filter-square','iconpdb-filter-tick','iconpdb-filter','iconpdb-finger-circle','iconpdb-finger-scan','iconpdb-firstline','iconpdb-flag-2','iconpdb-flag','iconpdb-flash-2','iconpdb-flash-circle-2','iconpdb-flash-circle','iconpdb-flash-slash','iconpdb-flash','iconpdb-folder-2','iconpdb-folder-add','iconpdb-folder-cloud','iconpdb-folder-connection','iconpdb-folder-cross','iconpdb-folder-favorite','iconpdb-folder-minus','iconpdb-folder-open','iconpdb-folder','iconpdb-forbidden-2','iconpdb-forbidden','iconpdb-format-circle','iconpdb-format-square','iconpdb-forward-10-seconds','iconpdb-forward-15-seconds','iconpdb-forward-5-seconds','iconpdb-forward-item','iconpdb-forward','iconpdb-framer','iconpdb-ftx-token-(ftt)','iconpdb-gallery-add','iconpdb-gallery-edit','iconpdb-gallery-export','iconpdb-gallery-favorite','iconpdb-gallery-import','iconpdb-gallery-remove','iconpdb-gallery-slash','iconpdb-gallery-tick','iconpdb-gallery','iconpdb-game','iconpdb-gameboy','iconpdb-gas-station','iconpdb-gemini-2','iconpdb-gemini','iconpdb-ghost','iconpdb-gift','iconpdb-glass-2','iconpdb-glass','iconpdb-global-edit','iconpdb-global-refresh','iconpdb-global-search','iconpdb-global','iconpdb-google-drive','iconpdb-google-play','iconpdb-google','iconpdb-gps-slash','iconpdb-gps','iconpdb-graph','iconpdb-grid-1','iconpdb-grid-2','iconpdb-grid-3','iconpdb-grid-4','iconpdb-grid-5','iconpdb-grid-6','iconpdb-grid-7','iconpdb-grid-8','iconpdb-grid-9','iconpdb-grid-add','iconpdb-grid-edit','iconpdb-grid-equal','iconpdb-grid-eraser','iconpdb-grid-lock','iconpdb-grids-4','iconpdb-happy','iconpdb-happyemoji','iconpdb-harmony-(one)','iconpdb-hashtag-2','iconpdb-hashtag-down','iconpdb-hashtag-up','iconpdb-hashtag','iconpdb-headphone','iconpdb-headphones','iconpdb-health','iconpdb-heart-add','iconpdb-heart-circle','iconpdb-heart-edit','iconpdb-heart-remove','iconpdb-heart-search','iconpdb-heart-slash','iconpdb-heart-tick','iconpdb-heart','iconpdb-hedera-hashgraph-(hbar)','iconpdb-hex-hex','iconpdb-hierarchy-2','iconpdb-hierarchy-3','iconpdb-hierarchy-square-2','iconpdb-hierarchy-square-3','iconpdb-hierarchy-square','iconpdb-hierarchy','iconpdb-home-2','iconpdb-home-3','iconpdb-home-hashtag','iconpdb-home-trend-down','iconpdb-home-trend-up','iconpdb-home-wifi','iconpdb-home','iconpdb-hospital','iconpdb-hourglass','iconpdb-house-2','iconpdb-house','iconpdb-html-3','iconpdb-html-5','iconpdb-huobi-token-ht','iconpdb-icon-(icx)','iconpdb-illustrator','iconpdb-image','iconpdb-import-arrow-01','iconpdb-import-arrow-02','iconpdb-import-circle-01','iconpdb-import-circle-02','iconpdb-info-circle','iconpdb-information','iconpdb-instagram','iconpdb-iost-(iost)','iconpdb-javascript','iconpdb-js','iconpdb-judge','iconpdb-key-square','iconpdb-key','iconpdb-keyboard-open','iconpdb-keyboard','iconpdb-kyber-network-(knc)','iconpdb-lamp-2','iconpdb-lamp-charge','iconpdb-lamp-on','iconpdb-lamp-slash','iconpdb-lamp','iconpdb-language-circle','iconpdb-language-square','iconpdb-layer','iconpdb-layout-adjust','iconpdb-leaf','iconpdb-left-bar-grid','iconpdb-left-sidebar-grid','iconpdb-level','iconpdb-lifebuoy','iconpdb-like-1','iconpdb-like-dislike','iconpdb-like-shapes','iconpdb-like-tag','iconpdb-like','iconpdb-link-2','iconpdb-link-3','iconpdb-link-4','iconpdb-link-circle','iconpdb-link-square','iconpdb-link','iconpdb-litecoin','iconpdb-location-add','iconpdb-location-cross','iconpdb-location-minus','iconpdb-location-slash','iconpdb-location-tick','iconpdb-location','iconpdb-lock-circle','iconpdb-lock-slash','iconpdb-lock','iconpdb-login-01','iconpdb-login-02','iconpdb-logout-01','iconpdb-logout-02','iconpdb-lovely','iconpdb-magic-star','iconpdb-magicpen','iconpdb-main-component','iconpdb-maker-mkr','iconpdb-man','iconpdb-map-1','iconpdb-map','iconpdb-mask-1','iconpdb-mask-2','iconpdb-mask','iconpdb-math','iconpdb-maximize-2','iconpdb-maximize-3','iconpdb-maximize-4','iconpdb-maximize-5','iconpdb-maximize-circle','iconpdb-maximize','iconpdb-medal-star','iconpdb-medal','iconpdb-menu-2','iconpdb-menu-board','iconpdb-menu','iconpdb-message-add-1','iconpdb-message-add','iconpdb-message-bubble','iconpdb-message-circle','iconpdb-message-edit','iconpdb-message-favorite','iconpdb-message-minus','iconpdb-message-notif','iconpdb-message-programming','iconpdb-message-question','iconpdb-message-remove','iconpdb-message-search','iconpdb-message-square','iconpdb-message-text-1','iconpdb-message-text','iconpdb-message-tick','iconpdb-message-time','iconpdb-messages-2','iconpdb-messages-bubbles-2','iconpdb-messages','iconpdb-messenger','iconpdb-microphone-2','iconpdb-microphone-slash-1','iconpdb-microphone-slash','iconpdb-microphone','iconpdb-milk','iconpdb-mini-music-square','iconpdb-minus-circle','iconpdb-minus-square','iconpdb-minus','iconpdb-mirror','iconpdb-mirroring-screen','iconpdb-mobile-programming','iconpdb-mobile','iconpdb-monero-xmr','iconpdb-money-2','iconpdb-money-3','iconpdb-money-4','iconpdb-money-add','iconpdb-money-change','iconpdb-money-forbidden','iconpdb-money-recive','iconpdb-money-remove','iconpdb-money-send','iconpdb-money-tick','iconpdb-money-time','iconpdb-money','iconpdb-moneys','iconpdb-monitor-mobile','iconpdb-monitor-recorder','iconpdb-monitor','iconpdb-moon','iconpdb-more-circle','iconpdb-more-square','iconpdb-more','iconpdb-mouse-2','iconpdb-mouse-circle','iconpdb-mouse-square','iconpdb-mouse','iconpdb-music-circle','iconpdb-music-dashboard','iconpdb-music-filter','iconpdb-music-library-2','iconpdb-music-play','iconpdb-music-playlist','iconpdb-music-square-add','iconpdb-music-square-remove','iconpdb-music-square-search','iconpdb-music-square','iconpdb-music','iconpdb-musical-note-ai','iconpdb-musicnote','iconpdb-nebulas-(nas)','iconpdb-nem-(xem)','iconpdb-nexo-(nexo)','iconpdb-next','iconpdb-note-1','iconpdb-note-2','iconpdb-note-3','iconpdb-note-add','iconpdb-note-favorite','iconpdb-note-remove','iconpdb-note-square','iconpdb-note-text','iconpdb-note','iconpdb-notification-2','iconpdb-notification-bing','iconpdb-notification-circle','iconpdb-notification-favorite','iconpdb-notification-status','iconpdb-notification','iconpdb-ocean-protocol-(ocean)','iconpdb-ok-app','iconpdb-okb-(okb)','iconpdb-omega-circle','iconpdb-omega-square','iconpdb-ontology-(ont)','iconpdb-padlock','iconpdb-paint-brush-2','iconpdb-paint-brush','iconpdb-paint-roller','iconpdb-paintbucket','iconpdb-paperclip-2','iconpdb-paperclip','iconpdb-paragraphspacing','iconpdb-password-check','iconpdb-path-2','iconpdb-path-square','iconpdb-path','iconpdb-pause-circle','iconpdb-pause','iconpdb-paypal','iconpdb-pen-add','iconpdb-pen-close','iconpdb-pen-remove','iconpdb-pen-tool-2','iconpdb-pen-tool','iconpdb-people','iconpdb-percentage-circle','iconpdb-percentage-square','iconpdb-personalcard','iconpdb-pet','iconpdb-photoshop','iconpdb-picture-frame','iconpdb-pig','iconpdb-play-add','iconpdb-play-circle-1','iconpdb-play-circle','iconpdb-play-remove','iconpdb-play','iconpdb-polkadot-(dot)','iconpdb-polygon-(matic)','iconpdb-polyswarm-(nct)','iconpdb-presention-chart','iconpdb-previous','iconpdb-printer-slash','iconpdb-printer','iconpdb-profile-2user','iconpdb-profile-add','iconpdb-profile-circle','iconpdb-profile-delete','iconpdb-profile-remove','iconpdb-profile-tick','iconpdb-profile','iconpdb-programming-arrow','iconpdb-programming-arrows','iconpdb-python','iconpdb-quant-(qnt)','iconpdb-quote-down-circle','iconpdb-quote-down-square','iconpdb-quote-down','iconpdb-quote-up-circle','iconpdb-quote-up-square','iconpdb-quote-up','iconpdb-radar-2','iconpdb-radar-3','iconpdb-radar','iconpdb-radio','iconpdb-ram-2','iconpdb-ram','iconpdb-ranking-2','iconpdb-ranking-3','iconpdb-ranking','iconpdb-receipt-1','iconpdb-receipt-2-1','iconpdb-receipt-2','iconpdb-receipt-add','iconpdb-receipt-discount','iconpdb-receipt-disscount','iconpdb-receipt-edit','iconpdb-receipt-item','iconpdb-receipt-minus','iconpdb-receipt-search','iconpdb-receipt-square','iconpdb-receipt-text','iconpdb-receipt','iconpdb-receive-square-01','iconpdb-receive-square-02','iconpdb-received','iconpdb-record-circle','iconpdb-record','iconpdb-recovery-convert','iconpdb-redo-arrow','iconpdb-refresh-arrow-01','iconpdb-refresh-arrow-02','iconpdb-refresh-circle','iconpdb-refresh-left','iconpdb-refresh-right','iconpdb-refresh-square','iconpdb-repeat-circle','iconpdb-repeat-music','iconpdb-repeat','iconpdb-repeate-one','iconpdb-reserve','iconpdb-rotate-left-2','iconpdb-rotate-left','iconpdb-rotate-right-2','iconpdb-rotate-right','iconpdb-route-square','iconpdb-routing-2','iconpdb-routing','iconpdb-row-horizontal','iconpdb-row-vertical','iconpdb-ruler-pen','iconpdb-ruler','iconpdb-safe-home','iconpdb-sagittarius','iconpdb-save-2','iconpdb-save-add','iconpdb-save-minus','iconpdb-save-remove','iconpdb-scan-barcode','iconpdb-scan','iconpdb-scanner','iconpdb-scanning','iconpdb-scissor-2','iconpdb-scissor','iconpdb-screenmirroring','iconpdb-scroll','iconpdb-search-favorite-1','iconpdb-search-favorite','iconpdb-search-normal','iconpdb-search-status-1','iconpdb-search-status','iconpdb-search-zoom-in-1','iconpdb-search-zoom-in','iconpdb-search-zoom-out-1','iconpdb-search-zoom-out','iconpdb-search','iconpdb-security-card','iconpdb-security-safe','iconpdb-security-time','iconpdb-security-user','iconpdb-security','iconpdb-send-2','iconpdb-send-3','iconpdb-send-square-01','iconpdb-send-square-02','iconpdb-send','iconpdb-setting-2','iconpdb-setting-3','iconpdb-setting-4','iconpdb-setting-5','iconpdb-settings-2','iconpdb-settings','iconpdb-shapes-1','iconpdb-shapes','iconpdb-share','iconpdb-shield-cross','iconpdb-shield-search','iconpdb-shield-security','iconpdb-shield-slash','iconpdb-shield-tick','iconpdb-shield','iconpdb-ship','iconpdb-shop-add','iconpdb-shop-remove','iconpdb-shop','iconpdb-shopping-bag','iconpdb-shopping-cart','iconpdb-shuffle','iconpdb-shutterstock','iconpdb-siacoin-(sc)','iconpdb-sidebar-bottom','iconpdb-sidebar-left','iconpdb-sidebar-right','iconpdb-sidebar-top','iconpdb-signpost','iconpdb-simcard-1','iconpdb-simcard-2','iconpdb-simcard','iconpdb-size','iconpdb-slack','iconpdb-slash','iconpdb-slider-horizontal-1','iconpdb-slider-horizontal','iconpdb-slider-vertical-1','iconpdb-slider-vertical','iconpdb-slider','iconpdb-smallcaps','iconpdb-smart-bag','iconpdb-smart-car','iconpdb-smart-cursor','iconpdb-smart-home','iconpdb-smart-lock-ai','iconpdb-smileys','iconpdb-sms-edit','iconpdb-sms-notification','iconpdb-sms-search','iconpdb-sms-star','iconpdb-sms-tracking','iconpdb-sms','iconpdb-snapchat','iconpdb-snowflake','iconpdb-solana-sol','iconpdb-sort','iconpdb-sound','iconpdb-speaker','iconpdb-speedometer','iconpdb-spotify','iconpdb-stacks-stx','iconpdb-star-slash','iconpdb-star','iconpdb-status-up','iconpdb-status','iconpdb-stellar-(xlm)','iconpdb-sticker','iconpdb-stickynote','iconpdb-stop-circle','iconpdb-stop','iconpdb-story','iconpdb-strongbox-2','iconpdb-strongbox','iconpdb-subtitle','iconpdb-sun-fog','iconpdb-sun','iconpdb-swap-horizontal-01','iconpdb-swap-horizontal-02','iconpdb-swap-horizontal-03','iconpdb-tag-2','iconpdb-tag-cross','iconpdb-tag-right','iconpdb-tag-user','iconpdb-tag','iconpdb-task-square','iconpdb-task','iconpdb-teacher','iconpdb-telescope','iconpdb-tenx-(pay)','iconpdb-tether-usdt','iconpdb-text-block','iconpdb-text-bold','iconpdb-text-italic','iconpdb-text-underline','iconpdb-text','iconpdb-textalign-center','iconpdb-textalign-justifycenter','iconpdb-textalign-justifyleft','iconpdb-textalign-justifyright','iconpdb-textalign-left','iconpdb-textalign-right','iconpdb-the-graph-(grt)','iconpdb-theta-(theta)','iconpdb-thorchain-(rune)','iconpdb-tick-circle','iconpdb-tick-square','iconpdb-ticket-2','iconpdb-ticket-discount','iconpdb-ticket-expired','iconpdb-ticket-star','iconpdb-ticket','iconpdb-timer-pause','iconpdb-timer-start','iconpdb-timer','iconpdb-toggle-off-circle','iconpdb-toggle-off','iconpdb-toggle-on-circle','iconpdb-toggle-on','iconpdb-top-bottom-grid','iconpdb-trade','iconpdb-transaction-minus','iconpdb-translate','iconpdb-trash-square','iconpdb-trash','iconpdb-tree','iconpdb-trello','iconpdb-trend-down','iconpdb-trend-up','iconpdb-triangle-2','iconpdb-triangle','iconpdb-trontron-trx','iconpdb-truck-fast','iconpdb-truck-remove','iconpdb-truck-tick','iconpdb-truck-time','iconpdb-truck','iconpdb-twitch','iconpdb-ui8','iconpdb-undo-arrow','iconpdb-unlimited','iconpdb-unlock','iconpdb-usd-coin-(usdc)','iconpdb-user-add','iconpdb-user-circle-add','iconpdb-user-edit','iconpdb-user-hexagon','iconpdb-user-minus','iconpdb-user-remove','iconpdb-user-search','iconpdb-user-square','iconpdb-user-tag','iconpdb-user-tick','iconpdb-user','iconpdb-velas-(vlx)','iconpdb-verify','iconpdb-vibe-vibe','iconpdb-video-add','iconpdb-video-circle','iconpdb-video-horizontal','iconpdb-video-octagon','iconpdb-video-play','iconpdb-video-remove','iconpdb-video-slash','iconpdb-video-square','iconpdb-video-tick','iconpdb-video-time','iconpdb-video-vertical','iconpdb-video','iconpdb-voice-circle','iconpdb-voice-square','iconpdb-volume-cross','iconpdb-volume-high','iconpdb-volume-low-1','iconpdb-volume-low','iconpdb-volume-mute','iconpdb-volume-slash','iconpdb-volume-up','iconpdb-vuesax','iconpdb-wallet-1','iconpdb-wallet-2','iconpdb-wallet-3','iconpdb-wallet-add-1','iconpdb-wallet-add','iconpdb-wallet-check','iconpdb-wallet-minus','iconpdb-wallet-money','iconpdb-wallet-remove','iconpdb-wallet-search','iconpdb-wallet','iconpdb-wanchain-(wan)-1','iconpdb-wanchain-(wan)','iconpdb-warning-2','iconpdb-watch-status','iconpdb-watch','iconpdb-weight-2','iconpdb-weight','iconpdb-whatsapp','iconpdb-wifi-square','iconpdb-wifi','iconpdb-wind-2','iconpdb-wind','iconpdb-windows','iconpdb-wing-wing-flight-aviation-aircraft-freedom-soar','iconpdb-woman','iconpdb-xd','iconpdb-xiaomi','iconpdb-xrp-xrp','iconpdb-youtube','iconpdb-zel-(zel)','iconpdb-zoom', 'iconpdb-linkedin', 'iconpdb-fish'
            ];

            this.icons = iconNames.map(name => ({
                name: name,
                displayName: name.replace('iconpdb-', ''),
                path: `${iconSelectorData.iconsPath}${name}.svg`
            }));

            this.filteredIcons = [...this.icons];
        }

        bindEvents() {
            const searchInput = document.getElementById('searchInput');

            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.searchTerm = e.target.value.toLowerCase();
                    this.filterIcons();
                });
            }
        }

        filterIcons() {
            this.filteredIcons = this.icons.filter(icon => {
                return icon.displayName.toLowerCase().includes(this.searchTerm);
            });

            this.renderIcons();
            this.updateStats();
        }

        async renderIcons() {
            const grid = document.getElementById('iconsGrid');
            const noResults = document.getElementById('noResults');

            if (!grid || !noResults) return;

            if (this.filteredIcons.length === 0) {
                grid.style.display = 'none';
                noResults.style.display = 'block';
                return;
            }

            grid.style.display = 'grid';
            noResults.style.display = 'none';

            grid.innerHTML = '';

            for (const icon of this.filteredIcons) {
                const iconElement = document.createElement('div');
                iconElement.className = 'icon-item';
                iconElement.innerHTML = `
                    <div class="icon-display">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </div>
                    <div class="icon-name">${icon.displayName}</div>
                    <div class="copy-feedback">Copiado!</div>
                `;

                iconElement.addEventListener('click', () => this.copyIconName(icon, iconElement));
                grid.appendChild(iconElement);

                // Tentar carregar o SVG real
                this.loadSVG(icon.path, iconElement.querySelector('svg'));
            }
        }

        async loadSVG(path, targetElement) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    const svgText = await response.text();
                    const parser = new DOMParser();
                    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
                    const svgElement = svgDoc.querySelector('svg');
                    
                    if (svgElement) {
                        svgElement.setAttribute('width', '24');
                        svgElement.setAttribute('height', '24');
                        svgElement.style.fill = 'currentColor';
                        targetElement.parentNode.replaceChild(svgElement, targetElement);
                    }
                }
            } catch (error) {
                console.log('Could not load SVG:', path);
            }
        }

        copyIconName(icon, element) {
            // Copia apenas o nome do ícone sem o prefixo "iconpdb-"
            const iconNameOnly = icon.displayName;
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(iconNameOnly).then(() => {
                    this.showCopyFeedback(element);
                }).catch(() => {
                    this.fallbackCopy(iconNameOnly, element);
                });
            } else {
                this.fallbackCopy(iconNameOnly, element);
            }
        }

        fallbackCopy(text, element) {
            // Fallback para navegadores que não suportam clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                this.showCopyFeedback(element);
            } catch (err) {
                console.error('Falha ao copiar texto:', err);
            }
            
            document.body.removeChild(textArea);
        }

        showCopyFeedback(element) {
            element.classList.add('copied');
            setTimeout(() => {
                element.classList.remove('copied');
            }, 2000);
        }

        updateStats() {
            const totalElement = document.getElementById('totalIcons');
            const visibleElement = document.getElementById('visibleIcons');

            if (totalElement) {
                totalElement.textContent = `${this.icons.length} ícones`;
            }

            if (visibleElement) {
                visibleElement.textContent = `${this.filteredIcons.length} visíveis`;
            }
        }
    }

    // Inicializar quando o DOM estiver pronto
    $(document).ready(function() {
        // Verificar se estamos na página correta
        if ($('.icon-selector-wrap').length > 0) {
            new IconSelector();
        }
    });

})(jQuery);