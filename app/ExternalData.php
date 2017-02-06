<?php

namespace App;

use App\Exceptions\EmptySource;
use App\Exceptions\InvalidExternalSource;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\Finder\Finder;

class ExternalData
{

    /**
     * @var array
     */
    protected $data = [];
    /**
     * @param array $paths
     */
    public function __construct(array $paths = [])
    {
        $this->setData($paths);
    }

    /**
     * @param array $paths
     * @return this
     */
    public function setData(array $paths = [])
    {
        $this->data = !empty($paths) ? $paths : $this->externalPaths();

        return $this;
    }

    /**
     * Real path of external data
     * @return string
     */
    protected function externalPaths()
    {
        $dir    = __DIR__ . '/../data';
        $finder = Finder::create()->files()->name('*.json')->in($dir);
        $data   = [];
        if (0 === $finder->count()) {
            throw new InvalidExternalSource("missing external files in '{$dir}' directory");
        }
        foreach ($finder as $item) {
            $data[$item->getFilename()] = $item->getRealPath();
        }
        unset($finder, $dir);

        return $data;
    }

    /**
     * @param $file
     * @return Illuminate\Support\Collection
     */
    public function __call($file, $arguments)
    {
        return Cache::remember($file, env('EXTERNAL_CACHE', 10), function () use ($file) {
            if (!$data = json_decode(file_get_contents($this->data[$file . '.json']), true)) {
                throw new EmptySource("{$file}");
            }

            return collect($data)->keyBy('id');
        });
    }

}
