INSET INTO new_table ( breed, name, sex, color, age, expelling, vaccinum, sterilization, nature, origin, deposit, remark) VALUES(ccccc, cccc, ddscd ds, cfff, eeeec, frw, jmjmt,  dcs cdcdcs dsdcad, dcdcdscd, vfevf, fvgv, vfrevf);

ALTER TABLE `adoption`.`new_table` 
ADD COLUMN `img_src` VARCHAR(45) NULL AFTER `remark`,
ADD COLUMN `new_tablecol` VARCHAR(45) NULL AFTER `img_src`;
