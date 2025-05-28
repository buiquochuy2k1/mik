document.addEventListener('DOMContentLoaded', function () {
  const btns = [
    { id: 'pppoeBtn', form: 'form1' },
    { id: 'aguardBtn', form: 'form2' },
    { id: 'firewallBtn', form: 'form3' },
    { id: 'openportBtn', form: 'form4' },
    { id: 'ddnsBtn', form: 'form5' },
    { id: 'ticketBtn', form: 'form6' },
    { id: 'vpnBtn', form: 'form7' },
  ];
  const defaultBtnClass =
    'flex flex-col items-center justify-center bg-[#23262F] text-gray-300 rounded-2xl shadow-lg py-3 px-1 md:py-5 md:px-2 w-full md:w-auto md:h-24 transition-all duration-300 hover:scale-105';
  const activeBtnClass =
    'flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700 text-white rounded-2xl shadow-lg py-3 px-1 md:py-5 md:px-2 w-full md:w-auto md:h-24 transition-all duration-300 hover:scale-105';

  // Function to reset all forms
  function resetAllForms() {
    // Reset Open Port form
    const openportIp = document.getElementById('openport-ip');
    const openportPort = document.getElementById('openport-port');
    const openportScriptBox = document.getElementById('openport-script-box');
    const openportScript = document.getElementById('openport-script');

    if (openportIp) openportIp.value = '';
    if (openportPort) openportPort.value = '';
    if (openportScriptBox) openportScriptBox.classList.add('hidden');
    if (openportScript) openportScript.textContent = '';

    // Reset DDNS form
    const ddnsProvider = document.getElementById('ddns-provider');
    const ddnsZoneId = document.getElementById('ddns-zoneid');
    const ddnsAccountId = document.getElementById('ddns-accountid');
    const ddnsEmail = document.getElementById('ddns-email');
    const ddnsApiKey = document.getElementById('ddns-apikey');
    const ddnsInterface = document.getElementById('ddns-interface');
    const ddnsScriptBox = document.getElementById('ddns-script-box');
    const ddnsScript = document.getElementById('ddns-script');
    const dnsRecordsContainer = document.getElementById('dns-records-container');

    if (ddnsProvider) ddnsProvider.value = '';
    if (ddnsZoneId) ddnsZoneId.value = '';
    if (ddnsAccountId) ddnsAccountId.value = '';
    if (ddnsEmail) ddnsEmail.value = '';
    if (ddnsApiKey) ddnsApiKey.value = '';
    if (ddnsInterface) ddnsInterface.value = 'pppoe-out1';
    if (ddnsScriptBox) ddnsScriptBox.classList.add('hidden');
    if (ddnsScript) ddnsScript.textContent = '';
    if (dnsRecordsContainer) {
      // Keep only the first record and clear its values
      const firstRecord = dnsRecordsContainer.querySelector('.dns-record-item');
      if (firstRecord) {
        const inputs = firstRecord.querySelectorAll('input');
        inputs.forEach((input) => (input.value = ''));
        dnsRecordsContainer.innerHTML = '';
        dnsRecordsContainer.appendChild(firstRecord);
      }
    }

    // Reset Firewall form
    const firewallScriptBox = document.getElementById('firewall-script-box');
    const firewallScript = document.getElementById('firewall-script');

    if (firewallScriptBox) firewallScriptBox.classList.add('hidden');
    if (firewallScript) firewallScript.textContent = '';
  }

  // Add DNS Record button handler
  const addDnsRecordBtn = document.getElementById('add-dns-record');
  if (addDnsRecordBtn) {
    addDnsRecordBtn.addEventListener('click', function () {
      const container = document.getElementById('dns-records-container');
      const newRecord = document.createElement('div');
      newRecord.className = 'dns-record-item grid grid-cols-[1fr_1fr_auto] gap-4 items-end';
      newRecord.innerHTML = `
        <div>
          <label class="block text-gray-300 mb-1">Record ID</label>
          <input
            type="text"
            class="w-full rounded-lg bg-[#181A20] border border-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập Record ID"
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-1">Domain</label>
          <input
            type="text"
            class="w-full rounded-lg bg-[#181A20] border border-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="VD: example.com"
          />
        </div>
        <button
          type="button"
          class="delete-record text-red-500 hover:text-red-400 transition-colors p-2"
          title="Xóa record"
        >
          <i class="bx bx-x-circle text-xl"></i>
        </button>
      `;
      container.appendChild(newRecord);

      // Add delete handler to the new record
      const deleteBtn = newRecord.querySelector('.delete-record');
      deleteBtn.addEventListener('click', function () {
        const container = document.getElementById('dns-records-container');
        const records = container.querySelectorAll('.dns-record-item');

        if (records.length > 1) {
          newRecord.remove();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Không thể xóa',
            text: 'Phải có ít nhất một DNS record!',
            confirmButtonColor: '#2563eb',
          });
        }
      });
    });
  }

  // Add delete handlers to initial record
  const initialDeleteBtn = document.querySelector('.delete-record');
  if (initialDeleteBtn) {
    initialDeleteBtn.addEventListener('click', function () {
      const container = document.getElementById('dns-records-container');
      const records = container.querySelectorAll('.dns-record-item');

      if (records.length > 1) {
        this.closest('.dns-record-item').remove();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Không thể xóa',
          text: 'Phải có ít nhất một DNS record!',
          confirmButtonColor: '#2563eb',
        });
      }
    });
  }

  btns.forEach((btn, idx) => {
    const button = document.getElementById(btn.id);
    const form = document.getElementById(btn.form);
    button.addEventListener('click', function (e) {
      e.preventDefault();
      // Reset all forms before switching
      resetAllForms();

      // Set all to default
      btns.forEach((b, i) => {
        const bBtn = document.getElementById(b.id);
        const bForm = document.getElementById(b.form);
        bBtn.className = defaultBtnClass;
        bForm.classList.add('hidden');
      });
      // Set active
      button.className = activeBtnClass;
      form.classList.remove('hidden');
    });
  });

  // Set default active (PPPOE)
  document.getElementById('pppoeBtn').className = activeBtnClass;
  document.getElementById('form1').classList.remove('hidden');
  for (let i = 1; i < btns.length; i++) {
    document.getElementById(btns[i].form).classList.add('hidden');
  }

  // PPPOE form handlers
  const pppoeProvider = document.getElementById('pppoe-provider');
  const fptOptions = document.getElementById('fpt-options');
  const cloneMacCheckbox = document.getElementById('pppoe-clone-mac');
  const macAddressInput = document.getElementById('mac-address-input');

  if (pppoeProvider) {
    pppoeProvider.addEventListener('change', function () {
      if (this.value === 'fpt') {
        fptOptions.classList.remove('hidden');
      } else {
        fptOptions.classList.add('hidden');
        macAddressInput.classList.add('hidden');
        cloneMacCheckbox.checked = false;
      }
    });
  }

  if (cloneMacCheckbox) {
    cloneMacCheckbox.addEventListener('change', function () {
      if (this.checked) {
        macAddressInput.classList.remove('hidden');
      } else {
        macAddressInput.classList.add('hidden');
      }
    });
  }

  // PPPOE script generator
  const pppoeGen = document.getElementById('pppoe-gen');
  if (pppoeGen) {
    pppoeGen.addEventListener('click', function () {
      const provider = document.getElementById('pppoe-provider').value;
      const username = document.getElementById('pppoe-username').value;
      const password = document.getElementById('pppoe-password').value;
      const pppoeInterface = document.getElementById('pppoe-interface').value || 'pppoe-out1';
      const wanInterface = document.getElementById('pppoe-wan').value || 'ether1';
      const bridgeName = document.getElementById('pppoe-bridge').value || 'bridgeLAN';
      const portCount = document.getElementById('pppoe-ports').value;
      const gatewayAddress = document.getElementById('pppoe-gateway').value || '192.168.1.1/24';
      const cloneMac = document.getElementById('pppoe-clone-mac').checked;
      const macAddress = document.getElementById('pppoe-mac').value;

      if (!provider || !username || !password || !portCount) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi!',
          text: 'Vui lòng điền đầy đủ thông tin bắt buộc',
          confirmButtonColor: '#3B82F6',
        });
        return;
      }

      let script = '';

      // Add MAC address for FPT if enabled
      if (provider === 'fpt' && cloneMac && macAddress) {
        script += `\n/interface ethernet set ${wanInterface} mac-address=${macAddress}\n`;
      }

      // PPP Profile Configuration
      script += `/ppp profile add bridge-learning=no change-tcp-mss=yes name=connect use-compression=no use-encryption=no use-upnp=no\n\n`;

      // PPPOE Client Configuration
      script += `/interface pppoe-client add add-default-route=yes disabled=no interface=${wanInterface} name=${pppoeInterface} user=${username} password="${password}"\n\n`;

      // Bridge Configuration
      script += `/interface bridge add name=${bridgeName}\n`;

      // Add ports to bridge
      for (let i = 2; i < 2 + parseInt(portCount) - 1; i++) {
        script += `/interface bridge port add bridge=${bridgeName} interface=ether${i}\n`;
      }
      script += '\n';

      // Extract network address from gateway
      const networkAddress = gatewayAddress.split('/')[0].split('.').slice(0, 3).join('.') + '.0/24';
      const gatewayIp = gatewayAddress.split('/')[0];
      const gatewayParts = gatewayIp.split('.');
      const poolStart = gatewayParts.slice(0, 3).join('.') + '.2';
      const poolEnd = gatewayParts.slice(0, 3).join('.') + '.254';

      // IP Address Configuration
      script += `/ip address add address=${gatewayAddress} interface=${bridgeName} network=${networkAddress}\n\n`;

      // DNS Configuration
      script += `/ip dns set servers=8.8.8.8,8.8.4.4\n\n`;

      // IP Pool Configuration
      script += `/ip pool add name=dhcp_pool1 ranges=${poolStart}-${poolEnd}\n\n`;

      // DHCP Server Configuration
      script += `/ip dhcp-server add address-pool=dhcp_pool1 interface=${bridgeName} name=dhcp1\n`;

      script += `/ip dhcp-server network add address=${networkAddress} gateway=${
        gatewayAddress.split('/')[0]
      }\n\n`;

      // NAT Configuration
      script += `/ip firewall nat add action=masquerade chain=srcnat out-interface=all-ppp\n`;

      document.getElementById('pppoe-script').textContent = script;
      document.getElementById('pppoe-script-box').classList.remove('hidden');
    });
  }

  // PPPOE copy button
  const pppoeCopy = document.getElementById('pppoe-copy');
  if (pppoeCopy) {
    pppoeCopy.addEventListener('click', function () {
      const scriptCode = document.getElementById('pppoe-script');
      const code = scriptCode.textContent;
      navigator.clipboard.writeText(code).then(() => {
        const old = pppoeCopy.innerHTML;
        pppoeCopy.innerHTML = '<i class="bx bx-check"></i> Đã copy!';
        pppoeCopy.classList.add('text-green-400');
        setTimeout(() => {
          pppoeCopy.innerHTML = '<i class="bx bx-copy"></i> Copy code';
          pppoeCopy.classList.remove('text-green-400');
        }, 1000);
      });
    });
  }

  // OPEN PORT script generator
  const openportGen = document.getElementById('openport-gen');
  if (openportGen) {
    openportGen.addEventListener('click', function () {
      const ip = document.getElementById('openport-ip').value.trim();
      const port = document.getElementById('openport-port').value.trim();
      const scriptBox = document.getElementById('openport-script-box');
      const scriptCode = document.getElementById('openport-script');
      if (!ip || !port) {
        scriptBox.classList.add('hidden');
        scriptCode.textContent = '';
        Swal.fire({
          icon: 'error',
          title: 'Thiếu thông tin',
          text: 'Vui lòng nhập đầy đủ IP và port!',
          confirmButtonColor: '#2563eb',
        });
        return;
      }
      // Tạo IP .0/24
      let ipPrefix = ip.split('.');
      if (ipPrefix.length === 4) {
        ipPrefix[3] = '0';
      }
      const ipSubnet = ipPrefix.join('.') + '/24';
      // Script mẫu
      const script = `/ip firewall nat add chain=dstnat dst-address=0.0.0.0/0 protocol=tcp dst-port=${port} action=dst-nat to-addresses=${ip} to-ports=${port}\n/ip firewall nat add chain=srcnat src-address=${ipSubnet} dst-address=${ip} protocol=tcp dst-port=${port} action=masquerade\n##Code script`;
      scriptCode.textContent = script;
      scriptBox.classList.remove('hidden');
    });
  }

  // DDNS script generator
  const ddnsGen = document.getElementById('ddns-gen');
  if (ddnsGen) {
    ddnsGen.addEventListener('click', function () {
      const provider = document.getElementById('ddns-provider').value;
      const zoneId = document.getElementById('ddns-zoneid').value.trim();
      const accountId = document.getElementById('ddns-accountid').value.trim();
      const email = document.getElementById('ddns-email').value.trim();
      const apiKey = document.getElementById('ddns-apikey').value.trim();
      const interface = document.getElementById('ddns-interface').value.trim() || 'pppoe-out1';
      const scriptBox = document.getElementById('ddns-script-box');
      const scriptCode = document.getElementById('ddns-script');

      // Get all DNS records
      const recordItems = document.querySelectorAll('.dns-record-item');
      const records = Array.from(recordItems).map((item) => {
        const inputs = item.querySelectorAll('input');
        return {
          recordId: inputs[0].value.trim(),
          domain: inputs[1].value.trim(),
        };
      });

      // Validate all required fields
      if (!provider || !zoneId || !accountId || !apiKey || (provider === 'cloudflare' && !email)) {
        scriptBox.classList.add('hidden');
        scriptCode.textContent = '';
        Swal.fire({
          icon: 'error',
          title: 'Thiếu thông tin',
          text: 'Vui lòng nhập đầy đủ thông tin cơ bản!',
          confirmButtonColor: '#2563eb',
        });
        return;
      }

      // Validate records
      const invalidRecords = records.filter((r) => !r.recordId || !r.domain);
      if (invalidRecords.length > 0) {
        scriptBox.classList.add('hidden');
        scriptCode.textContent = '';
        Swal.fire({
          icon: 'error',
          title: 'Thiếu thông tin',
          text: 'Vui lòng nhập đầy đủ thông tin cho tất cả các record!',
          confirmButtonColor: '#2563eb',
        });
        return;
      }

      let script = '';
      if (provider === 'cloudflare') {
        // Base script template
        script = `:delay 5
/ip firewall address-list remove [/ip firewall address-list find list=WAN]
:foreach tda in=[/ip address find where interface~"${interface}"] do={ :local tdaaddress [/ip address get $tda address]; /ip firewall address-list add address=$tdaaddress list=WAN; }

:local wanip [/ip address get [/ip address find where interface=${interface}] address];
:set wanip [:pick $wanip 0 ([:len $wanip]-3)];
:put $wanip;

:local domains {
${records
  .map((r) => `    {"zone_id"="${zoneId}"; "record_id"="${r.recordId}"; "name"="${r.domain}"};`)
  .join('\n')}
}

:foreach domain in=$domains do={
    :local zoneId ($domain->"zone_id");
    :local recordId ($domain->"record_id");
    :local name ($domain->"name");

    :local httpData "{\\"type\\":\\"A\\",\\"name\\":\\"$name\\",\\"content\\":\\"$wanip\\",\\"ttl\\":60,\\"proxied\\":false}";

    /tool fetch \\
        http-data=$httpData \\
        url="https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records/$recordId" \\
        http-method=put \\
        mode=https \\
        keep-result=no \\
        http-header-field="X-Auth-Email: ${email}, X-Auth-Key: ${apiKey}, Content-Type: application/json";

    :put "Updated $name to IP $wanip";
}`;
      } else if (provider === 'dynu') {
        script = records.map((r) => `/tool dns-update name=${r.domain} api-key=${apiKey}\n`).join('');
      }

      scriptCode.textContent = script;
      scriptBox.classList.remove('hidden');
    });
  }

  // Copy code buttons
  const openportCopy = document.getElementById('openport-copy');
  if (openportCopy) {
    openportCopy.addEventListener('click', function () {
      const scriptCode = document.getElementById('openport-script');
      const code = scriptCode.textContent;
      navigator.clipboard.writeText(code).then(() => {
        const old = openportCopy.innerHTML;
        openportCopy.innerHTML = '<i class="bx bx-check"></i> Đã copy!';
        openportCopy.classList.add('text-green-400');
        setTimeout(() => {
          openportCopy.innerHTML = '<i class="bx bx-copy"></i> Copy code';
          openportCopy.classList.remove('text-green-400');
        }, 1000);
      });
    });
  }

  const ddnsCopy = document.getElementById('ddns-copy');
  if (ddnsCopy) {
    ddnsCopy.addEventListener('click', function () {
      const scriptCode = document.getElementById('ddns-script');
      const code = scriptCode.textContent;
      navigator.clipboard.writeText(code).then(() => {
        const old = ddnsCopy.innerHTML;
        ddnsCopy.innerHTML = '<i class="bx bx-check"></i> Đã copy!';
        ddnsCopy.classList.add('text-green-400');
        setTimeout(() => {
          ddnsCopy.innerHTML = '<i class="bx bx-copy"></i> Copy code';
          ddnsCopy.classList.remove('text-green-400');
        }, 1000);
      });
    });
  }

  // Firewall script generator
  const firewallGen = document.getElementById('firewall-gen');
  if (firewallGen) {
    firewallGen.addEventListener('click', function () {
      const scriptBox = document.getElementById('firewall-script-box');
      const scriptCode = document.getElementById('firewall-script');

      const script = `# Tham khảo thêm code bảo mật ở https://rickfreyconsulting.com/basic-mikrotik-firewall-rev-5-0-free-version/
/ip service set telnet disabled=yes
/ip service set ftp disabled=yes
/ip service set www disabled=yes
/ip service set ssh disabled=yes
/ip service set api disabled=yes
/ip service set api-ssl disabled=yes
/ip firewall filter
add chain=forward dst-port=11211 protocol=udp action=drop comment="Memcrashed - Amplification Attacks UDP 11211"
/ip firewall filter
add chain=forward connection-state=new action=jump jump-target=block-ddos comment="Anti DDoS Attacks"
add chain=forward connection-state=new src-address-list=ddoser dst-address-list=ddosed action=drop
add chain=block-ddos dst-limit=50,50,src-and-dst-addresses/10s action=return
add chain=block-ddos action=add-dst-to-address-list address-list=ddosed address-list-timeout=10m
add chain=block-ddos action=add-src-to-address-list address-list=ddoser address-list-timeout=10m
/ip firewall filter
add chain=input protocol=tcp psd=21,3s,3,1 action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="Mark Source ip port scanner to Address list " disabled=no
add chain=input protocol=tcp tcp-flags=fin,!syn,!rst,!psh,!ack,!urg action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="NMAP FIN Stealth scan"
add chain=input protocol=tcp tcp-flags=fin,syn action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="SYN/FIN scan"
add chain=input protocol=tcp tcp-flags=syn,rst action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="SYN/RST scan"
add chain=input protocol=tcp tcp-flags=fin,psh,urg,!syn,!rst,!ack action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="FIN/PSH/URG scan"
add chain=input protocol=tcp tcp-flags=fin,syn,rst,psh,ack,urg action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="ALL/ALL scan"
add chain=input protocol=tcp tcp-flags=!fin,!syn,!rst,!psh,!ack,!urg action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="NMAP NULL scan"
add chain=input src-address-list="port scanners" action=drop comment="Drop port scanners" disabled=no
/ip firewall filter
add action=drop chain=input comment="drop ftp BRUTE FORCErs" dst-port=21 protocol=tcp src-address-list=ftp_blacklist
add action=accept chain=output content="530 Login incorrect" dst-limit=1/1m,9,dst-address/1m protocol=tcp
add action=add-dst-to-address-list address-list=ftp_blacklist address-list-timeout=3h chain=output content="530 Login incorrect" protocol=tcp
add action=drop chain=input comment="drop ssh BRUTE FORCErs" dst-port=22-23 protocol=tcp src-address-list=ssh_blacklist
add action=add-src-to-address-list address-list=ssh_blacklist address-list-timeout=1w3d chain=input connection-state=new dst-port=22-23 protocol=tcp src-address-list=ssh_stage3
add action=add-src-to-address-list address-list=ssh_stage3 address-list-timeout=1m chain=input connection-state=new dst-port=22-23 protocol=tcp src-address-list=ssh_stage2
add action=add-src-to-address-list address-list=ssh_stage2 address-list-timeout=1m chain=input connection-state=new dst-port=22-23 protocol=tcp src-address-list=ssh_stage1
add action=add-src-to-address-list address-list=ssh_stage1 address-list-timeout=1m chain=input connection-state=new dst-port=22-23 protocol=tcp
add action=drop chain=forward comment="drop ssh brute downstream" dst-port=22-23 protocol=tcp src-address-list=ssh_blacklist`;

      scriptCode.textContent = script;
      scriptBox.classList.remove('hidden');
    });
  }

  // Firewall copy button
  const firewallCopy = document.getElementById('firewall-copy');
  if (firewallCopy) {
    firewallCopy.addEventListener('click', function () {
      const scriptCode = document.getElementById('firewall-script');
      const code = scriptCode.textContent;
      navigator.clipboard.writeText(code).then(() => {
        const old = firewallCopy.innerHTML;
        firewallCopy.innerHTML = '<i class="bx bx-check"></i> Đã copy!';
        firewallCopy.classList.add('text-green-400');
        setTimeout(() => {
          firewallCopy.innerHTML = '<i class="bx bx-copy"></i> Copy code';
          firewallCopy.classList.remove('text-green-400');
        }, 1000);
      });
    });
  }

  // Adguard script generator
  const aguardGen = document.getElementById('aguard-gen');
  if (aguardGen) {
    aguardGen.addEventListener('click', function () {
      const ip = document.getElementById('aguard-ip').value.trim();
      const bridge = document.getElementById('aguard-bridge').value.trim() || 'dockers';
      const scriptBox = document.getElementById('aguard-script-box');
      const scriptCode = document.getElementById('aguard-script');

      if (!ip) {
        scriptBox.classList.add('hidden');
        scriptCode.textContent = '';
        Swal.fire({
          icon: 'error',
          title: 'Thiếu thông tin',
          text: 'Vui lòng nhập địa chỉ IP của Adguard!',
          confirmButtonColor: '#2563eb',
        });
        return;
      }

      // Extract gateway IP (remove last octet)
      const gatewayIP = ip.split('.').slice(0, 3).join('.');

      const script = `# Script đã được tối ưu để sử dụng 1 cách ổn định nếu bạn không rành Mikrotik vui lòng đừng sửa chữa linh tinh

/system/device-mode/update container=yes
/interface veth add address=${ip} gateway=${ip} gateway6="" name=veth1
/interface bridge add name=${bridge}
/interface bridge port add bridge=${bridge} interface=veth1
/ip address add address=${ip}/24 interface=${bridge} network=${gatewayIP}.0
/ip firewall address-list add list=LAN address=${gatewayIP}.0/24
/ip firewall mangle add action=accept chain=prerouting dst-address-list=LAN src-address-list=LAN
/container config set registry-url=https://registry-1.docker.io tmpdir=/container/tmp
/container add interface=veth1 start-on-boot=yes remote-image=adguard/adguardhome:latest
:delay 100s
start 0

# Cài xong rồi đấy truy cập vào ${ip}:3000 để cấu hình Adguard nhé`;

      scriptCode.textContent = script;
      scriptBox.classList.remove('hidden');
    });
  }

  // Adguard copy button
  const aguardCopy = document.getElementById('aguard-copy');
  if (aguardCopy) {
    aguardCopy.addEventListener('click', function () {
      const scriptCode = document.getElementById('aguard-script');
      const code = scriptCode.textContent;
      navigator.clipboard.writeText(code).then(() => {
        const old = aguardCopy.innerHTML;
        aguardCopy.innerHTML = '<i class="bx bx-check"></i> Đã copy!';
        aguardCopy.classList.add('text-green-400');
        setTimeout(() => {
          aguardCopy.innerHTML = '<i class="bx bx-copy"></i> Copy code';
          aguardCopy.classList.remove('text-green-400');
        }, 1000);
      });
    });
  }
});
