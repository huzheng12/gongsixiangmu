/**
 * tv symbol配置
 */
export const SymbolInfo = {
  minmov: 1,
  minmov2: 0,
  pointvalue: 1,
  session: '24x7', //交易时段，全天交易
  has_seconds: false,
  has_daily: true, //影响到1D，
  has_weekly_and_monthly: true, //1W resolution
  has_no_volume: false,
  has_empty_bars: true,
  description: '',
  has_intraday: true,
  intraday_multipliers: ['1', '5', '15', '30', '60', '360'],
  supported_resolutions: ['1', '5', '15', '30', '60', '120', '240', '360', '720', '1D', '1W'],
  pricescale: 100000000, //价格精度
  name: 'btc_usd',
  ticker: 'btc_usd',
  volume_precision: 3, //数量精度
};

/**
 * 将一位时间转为两位
 * @param {string||number} time 
 */
const toDouble = (time) => {
  if (String(time).length < 2) {
    time = "0" + time;
  }
  return time
};

/**
 * Tv 构造器基础配置
 */
export const WidgetInfo = {
  timezone: "Asia/Shanghai", //设置时区
  debug: false, // uncomment this line to see Library errors and warnings in the console
  fullscreen: true,
  symbol: "btc_usd",
  interval: '1',
  container_id: "tv_chart_container",
  library_path: "/charting_library/",
  locale: "zh" || "en",
  pricescale: 100000000,
  // autosize: true,
  customFormatters: {
    timeFormatter: {
      format: function(date) { var _format_str = '%h:%m'; return _format_str.replace('%h', toDouble(date.getUTCHours()), 2). replace('%m', toDouble(date.getUTCMinutes()), 2). replace('%s', date.getUTCSeconds(), 2); }
    },
    dateFormatter: {
      format: function(date) { return date.getUTCFullYear() + '-' + toDouble(date.getUTCMonth() + 1) + '-' + toDouble(date.getUTCDate()); }
    }
  },
  disabled_features: [ //禁用功能
    'header_symbol_search',
    'symbol_search_hot_key',
    'header_compare',
    'header_undo_redo',
    'header_screenshot',
    'volume_force_overlay',
    'header_settings',
    'header_widget_dom_node',
    'header_resolutions',
  ],
  enabled_features: [ //启用的功能
    "dont_show_boolean_study_arguments", //是否隐藏指标参数
    "hide_last_na_study_output", //隐藏最后一次指标输出
    "same_data_requery",
    "side_toolbar_in_fullscreen_mode",
    'adaptive_logo'
  ],
  theme: "light",
  // indicators_file_name: "test.js",
};




