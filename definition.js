const GPSColorBlock = "#006666";

Blockly.Blocks['uno_gps_init'] = {
    init: function () {
        this.jsonInit(
            {
                type: "uno_gps_init",
                message0: "khởi tạo GPS RX %1 TX %2 múi giờ %3",
                previousStatement: null,
                nextStatement: null,
                args0: [
                    {
                        type: "field_dropdown",
                        name: "rx_pin",
                        options: digitalPins
                    },
                    {
                        type: "field_dropdown",
                        name: "tx_pin",
                        options: digitalPins
                    },
                    {
                        type: "field_dropdown",
                        name: "gmt",
                        options: [["GMT+7","7"], ["GMT+8","8"], ["GMT+9","9"], ["GMT+10","10"], ["GMT+11","11"], ["GMT+12","12"], ["GMT-11","-11"], ["GMT-10","-10"], ["GMT-9","-9"], ["GMT-8","-8"], ["GMT-7","-7"], ["GMT-6","-6"], ["GMT-5","-5"], ["GMT-4","-4"], ["GMT-3","-3"], ["GMT-2","-2"], ["GMT-1","-1"], ["GMT+0","0"], ["GMT+1","1"], ["GMT2","2"], ["GMT+3","3"], ["GMT+4","4"], ["GMT+5","5"], ["GMT+6","6"]]
                    }
                    
                ],
                colour: GPSColorBlock,
                tooltip: "khởi tạo module GPS với thông tin về UART và múi giờ",
                helpUrl: ""
            }
        );
    }
};

Blockly.Python['uno_gps_init'] = function (block) {
    var tx = block.getFieldValue('tx_pin');
    var rx = block.getFieldValue('rx_pin');
    var gmt = block.getFieldValue('gmt');
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_uno_micropygps'] = 'from micropyGPS import *';
    Blockly.Python.definitions_['init_micropygps'] = 'micropygps = MicropyGPS(' + rx + '_PIN, ' + tx + '_PIN, ' + gmt + ')';
    Blockly.Python.definitions_['add_task_micropygps_read_input'] = 'create_task(micropygps.read_input())';
    // TODO: Assemble Python into code variable.
    var code = '';
    return code;
};

Blockly.Blocks['uno_gps_ready'] = {
  init: function () {
      this.jsonInit(
          {
              type: "uno_gps_ready",
              message0: "GPS đã nhận tín hiệu",
              args0: [
              ],
              output: "Boolean",
              colour: GPSColorBlock,
              tooltip: "",
              helpUrl: ""
          }
      );
  }
};

Blockly.Python['uno_gps_ready'] = function (block) {
  // TODO: Assemble Python into code variable.

  var code = "micropygps.latitude_decimal() != None";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Blocks['uno_gps_read'] = {
    init: function () {
        this.jsonInit(
            {
                type: "uno_gps_read",
                message0: "lấy giá trị %1 từ GPS",
                args0: [
                    {
                        type: "field_dropdown",
                        name: "value",
                        options: [
                            [
                                "giờ",
                                "timestamp[0]"
                            ],
                            [
                                "phút",
                                "timestamp[1]"
                            ],
                            [
                                "giây",
                                "timestamp[2]"
                            ],
                            [
                                "vĩ độ (string)",
                                "latitude_string()"
                            ],
                            [
                                "vĩ độ (number)",
                                "latitude_decimal()"
                            ],
                            [
                                "kinh độ (string)",
                                "longitude_string()"
                            ],
                            [
                                "kinh độ (number)",
                                "longitude_decimal()"
                            ],
                            [
                                "độ cao",
                                "altitude"
                            ],
                            [
                                "số vệ tinh tìm được",
                                "satellites_in_use"
                            ],
                            [
                                "ngày, tháng, năm",
                                "date_string('long')"
                            ],
                            [
                                "tốc độ gió",
                                "speed_string()"
                            ]

                        ]
                    }
                ],
                output: null,
                colour: GPSColorBlock,
                tooltip: "",
                helpUrl: ""
            }
        );
    }
};

Blockly.Python['uno_gps_read'] = function (block) {
    var value = block.getFieldValue('value');
    // TODO: Assemble Python into code variable.

    var code = 'micropygps.' + value;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};
