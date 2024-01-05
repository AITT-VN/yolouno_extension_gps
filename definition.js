const GPSColorBlock = "#006666";

var digitalPins = [
    [
        "D3",
        "D3"
    ],
    [
        "D4",
        "D4"
    ],
    [
        "D5",
        "D5"
    ],
    [
        "D6",
        "D6"
    ],
    [
        "D7",
        "D7"
    ],
    [
        "D8",
        "D8"
    ],
    [
        "D9",
        "D9"
    ],
    [
        "D10",
        "D10"
    ],
    [
        "D11",
        "D11"
    ],
    [
        "D12",
        "D12"
    ],
    [
        "D13",
        "D13"
    ],
    [
        "D0",
        "D0"
    ],
    [
        "D1",
        "D1"
    ],
    [
        "D2",
        "D2"
    ]
];

Blockly.Blocks['uno_gps_create'] = {
    init: function () {
        this.jsonInit(
            {
                type: "uno_gps_create",
                message0: "khởi tạo GPS chân RX %1 chân TX %2",
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
                    }
                ],
                colour: GPSColorBlock,
                tooltip: "khởi tạo kết nối UART",
                helpUrl: ""
            }
        );
    }
};

Blockly.Python['uno_gps_create'] = function (block) {
    var tx = block.getFieldValue('tx_pin');
    var rx = block.getFieldValue('rx_pin');
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_uno_gps'] = 'from gps import *';
    Blockly.Python.definitions_['init_uart'] = 'uart = machine.UART(1, baudrate=9600, rx=' + rx + '.pin, tx=' + tx + '.pin, bits=8, parity=None, stop=1, timeout=5000, rxbuf=1024)';
    Blockly.Python.definitions_['init_gps'] = 'gps = MicropyGPS()';
    // TODO: Assemble Python into code variable.
    var code = '';
    return code;
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
                                "giờ (GMT)",
                                "timestamp[0]"
                            ],
                            [
                                "phút (GMT)",
                                "timestamp[1]"
                            ],
                            [
                                "giây (GMT)",
                                "timestamp[2]"
                            ],
                            [
                                "vĩ độ",
                                "latitude_string()"
                            ],
                            [
                                "kinh độ",
                                "longitude_string()"
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
                                "ngày, tháng, năm (GMT)",
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

    var code = 'gps.' + value;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['uno_gps_update'] = {
    init: function () {
        this.jsonInit(
            {
                type: "uno_gps_update",
                message0: "cập nhập thông tin GPS",
                previousStatement: null,
                nextStatement: null,
                colour: GPSColorBlock,
                tooltip: "",
                helpUrl: ""
            }
        );
    }
};

Blockly.Python['uno_gps_update'] = function (block) {
    // TODO: Assemble Python into code variable.
    var code = 'buf = uart.readline()\n' + 'for char in buf:' + '\n' + '\tgps.update(chr(char))\n';
    return code;
};