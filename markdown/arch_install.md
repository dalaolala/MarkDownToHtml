# arch安装配置过程
## 安装
1. 分区，使用fdisk ，使用mkfs.ext4格式化分区后的磁盘
2. 测试网络
```
ping -c 4 http://www.baidu.com
```
3. 更改系统源
```
cd /etc/pacman.d
sed -i "s/^\b/#/g" mirrorlist 
vim mirrorlist
然后把163开头的#去掉
```
4. 安装系统基础
```
pacman -Syy
pacstrap /mnt base base-devel
genfstab -U -p /mnt >>/mnt/etc/fstab
arch-chroot /mnt /bin/bash
```
5. 编码和时区
    ```
    vim /etc/locale.gen
    ```
    - 内容大致修改为：
    ```
    en_US.UTF-8 UTF-8
    zh_CN.UTF-8 UTF-8
    zh_TW.UTF-8 UTF-8
    ```
    - 设置
    ```
    locale-gen
    echo LANG=en_US.UTF-8 > /etc/locale.conf
    ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
    hwclock --systohc --utc
    ```
6. 设置主机名：
```
echo archlinuxpc > /etc/hostname
```
7. 设置自动连接有线网络
```
systemctl start dhcpcd
systemctl enable dhcpcd
```
8. 更改密码,添加用户
    - 修改root密码 
    ```
        passwd 
    ```
    - 添加用户
    ```
    useradd -m -g users -G wheel -s /bin/bash 用户名
    passwd 用户名
    ```
    - 添加sudo
    ```
    vim /etc/sudoers
    ```
9. 添加引导
    - 对于UEFI:
    ```
    mkdir -p /mnt/boot/EFI  (创建UEFI挂载点)
    mount /dev/sdX(Y) /mnt/boot/efi  (挂载UEFI分区，一般情况下使用靠前的分区)
    pacman -S dosfstools efibootmgr
    pacman -S grub
    pacman -S os-prober
    grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=arch_grub --recheck
    grub-mkconfig -o /boot/grub/grub.cfg
    ```
    - 对于bios
    ```
    pacman -S grub
    grub-install /dev/sda --force
    grub-mkconfig -o /boot/grub/grub.cfg
    ```
8. 退出安装
    - 退出前先安装wifi
    ```
    pacman -S dialog  (wifi-menu)
    exit
    pacman -S dialog
    umount /mnt/{home,boot} 
    umount /mnt 
    reboot
    ```
9. 安装驱动
    - 声卡驱动
    ```
    pacman -S alsa-utils
    alsamixer #调节音量
    ```
    - 安装intel核显
    ```
    pacman -S mesa xf86-video-intel
    ```
    - 其他驱动
    ```
    pacman -S xf86-input-synaptics
    pacman -S xorg xorg-server xorg-xinit xorg-utils xorg-server-utils
    ```
10. 常用安装
    - 常用软件安装
    ```
    pacman -S fcitx fcitx-qt unrar p7zip cpio zip unzip leafpad xarchiver firefox firefox-i18n-zh-cn flashplugin
    ```
    - 安装常用字体：
    ```
    pacman -S ttf-dejavu wqy-zenhei wqy-microhei
    ```
    - 安装gnome桌面
    ``` 
    pacman -S gdm gnome gnome-extra
    systemctl enable gdm
    ```
    - 安装ntfs磁盘读写
    ``` 
    sudo pacman -S ntfs-3g
    ```
    - 使用网络管理
    ```
    systemctl enable NetworkManager
    ```
    - wifi热点
    ``` 
    sudo pacman -S dnsmasq
    ```
11. 常用配置
    - 输入法配置
    ```
    vim ~/.profile
    ```
    修改为
    ```
    export XIM=fcitx
    export XMODIFIERS="@im=fcitx"
    export GTK_IM_MODULE=fcitx
    export QT_IM_MODULE=fcitx
    export XIM_PROGRAM=fcitx
    fcitx &
    ```
    - 挂载硬盘不用密码
    ```
    vim /usr/share/polkit-1/actions/org.freedesktop.udisks2.policy
    ```
    把与id="org.freedesktop.udisks2.filesystem-mount-system"中
    <allow_active>auth_admin_keep</allow_active>改为<allow_active>yes</allow_active>