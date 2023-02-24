const { Sonyflake } = require('sonyflake');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 12/01/2023
 * @description algorithm number
 * @return {Number}
 */
const machineNo = process.env.MACHINE_NO || 0; // default 0: first process
const epoch_date = Date.UTC(2020, 01, 01, 0, 0, 0);

const SONYFLAKE_IMG = new Sonyflake({
    machineId: machineNo * 10 + 0, // 0 = type image
    epoch: epoch_date,
});

const SONYFLAKE_VID = new Sonyflake({
    machineId: machineNo * 10 + 1, // 1 = type video
    epoch: epoch_date,
});

const SONYFLAKE_AUD = new Sonyflake({
    machineId: machineNo * 10 + 2, // 2 = type audio
    epoch: epoch_date,
});

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 12/01/2023
     * @description Create Id
     * @param type
     * @return {Number}
     */
    createID: (type) => {
        if (type == 'image') return SONYFLAKE_IMG.nextId();
        else if (type == 'video') return SONYFLAKE_VID.nextId();
        else if (type == 'audio') return SONYFLAKE_AUD.nextId();

        return false;
    },
};
