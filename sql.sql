INSET INTO new_table ( breed, name, sex, color, age, expelling, vaccinum, sterilization, nature, origin, deposit, remark) VALUES(ccccc, cccc, ddscd ds, cfff, eeeec, frw, jmjmt,  dcs cdcdcs dsdcad, dcdcdscd, vfevf, fvgv, vfrevf);

ALTER TABLE `adoption`.`new_table` 
ADD COLUMN `img_src` VARCHAR(45) NULL AFTER `remark`,
ADD COLUMN `new_tablecol` VARCHAR(45) NULL AFTER `img_src`;


INSERT INTO new_table ( breed, name, sex, color, age, expelling, vaccinum, sterilization, nature, origin, deposit, remark, img_srcs) VALUES("ccc", "vv", "sw", "xxx", "www", "ddd", "wwwwww", "ds", "fc", "edddd", "wwww", "qqqq", "cat1_1493107061989.jpg|cat2_1493107061990.jpg|cat3_1493107061993.jpg|cat4_1493107061998.jpg");