// Ops Terminal Animation
const runOpsTerminalAnimation = async () => {
    const container = document.getElementById('ops-terminal-content');
    if (!container) return;

    const typeText = async (element, text, speed = 50) => {
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            await new Promise(r => setTimeout(r, speed));
        }
    };

    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    while (true) {
        container.innerHTML = ''; // Reset

        // Command 1
        const line1 = document.createElement('div');
        line1.innerHTML = '<span class="cmd-prompt">$</span><span class="cmd-val"></span><span class="cursor-blink">_</span>';
        container.appendChild(line1);

        const cmd1Span = line1.querySelector('.cmd-val');
        const cursor1 = line1.querySelector('.cursor-blink');
        await wait(1000);
        cursor1.style.display = 'inline'; // Ensure visible before typing
        await typeText(cmd1Span, 'check_status docker');
        cursor1.remove(); // Remove cursor after typing

        // Output 1
        await wait(300);
        const out1 = document.createElement('div');
        out1.className = 'text-gray-400 fade-in';
        out1.innerHTML = 'Daemon: <span class="text-green-400 font-bold">ACTIVE</span>';
        container.appendChild(out1);

        // Command 2
        await wait(800);
        const line2 = document.createElement('div');
        line2.className = 'mt-2';
        line2.innerHTML = '<span class="cmd-prompt">$</span><span class="cmd-val"></span><span class="cursor-blink">_</span>';
        container.appendChild(line2);

        const cmd2Span = line2.querySelector('.cmd-val');
        const cursor2 = line2.querySelector('.cursor-blink');
        await typeText(cmd2Span, 'kubectl get pods');
        cursor2.remove();

        // Output 2
        await wait(300);
        const tableHeader = document.createElement('div');
        tableHeader.className = 'text-gray-500';
        tableHeader.innerText = 'NAME           STATUS';
        container.appendChild(tableHeader);

        const rows = [
            { name: 'docker-registry', status: 'RUNNING', color: 'text-green-400' },
            { name: 'jenkins-pipeline', status: 'IDLE', color: 'text-yellow-400' },
            { name: 'github-runner', status: 'ACTIVE', color: 'text-green-400' }
        ];

        for (let row of rows) {
            await wait(200);
            const rowDiv = document.createElement('div');
            rowDiv.innerHTML = `<div class="mt-1 text-gray-300">${row.name}</div><div class="${row.color}">${row.status}</div>`;
            container.appendChild(rowDiv);
        }

        // Final Prompt (Waiting for input)
        await wait(500);
        const line3 = document.createElement('div');
        line3.className = 'mt-2';
        line3.innerHTML = '<span class="cmd-prompt">$</span><span class="cursor-blink">_</span>';
        container.appendChild(line3);

        // Wait before restarting loop
        await wait(4000);
    }
};

document.addEventListener('DOMContentLoaded', runOpsTerminalAnimation);
