import os from 'os'
import v8 from 'v8'
import  { monitorEventLoopDelay } from 'perf_hooks';
const appHealth = async(req,res,next)=>{
    try {
        const memory = process.memoryUsage();
        const heapStats = v8.getHeapStatistics();
        const h = await monitorEventLoopDelay();
        await h.enable();
        const eventLoopDelay = `Event Loop Delay: ${h.mean} ms`
        const temp = Object.keys(heapStats).map((key,i)=>(`${key}:${heapStats[key]/ 1024 / 1024}MB`))
        const heaplimit = `Heap limit: ${heapStats.heap_size_limit / 1024 / 1024} MB`
        const physicalSize = `Physical size: ${heapStats.total_physical_size / 1024 / 1024} MB`
  const freeMem = os.freemem() / os.totalmem(); // Percentage of system RAM free
  const load = os.loadavg()[0]; // 1-minute CPU load average
  const cpuCores = os.cpus().length;

  // Logic: If CPU load is higher than number of cores, we are overloaded
  const isOverloaded = load > cpuCores * 0.8; // 80% threshold

  const healthStatus = {
    status: isOverloaded ? 'Degraded' : 'Healthy',
    memoryUsed: `${Math.round(memory.rss / 1024 / 1024)} MB`,
    freeSystemMem: `${(freeMem * 100).toFixed(2)}%`,
    cpuLoad: load.toFixed(2),
    uptime: `${Math.round(process.uptime())}s`,
    eventLoopDelay,
    heapStats
  };
  return res.status(isOverloaded ? 503 : 200).json(healthStatus);
        
    } catch (error) {
        next(error)
    }
}

export default appHealth